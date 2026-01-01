import cloudinary from "../../config/cloudinary.js"
import {pool} from "../../databaseConnection/db-connect.js"

class PlayListService {

    async createPlayList(playListData) {
        const { userId, playlistName, image, trackId } = playListData
        
        const client = await pool.connect()
        try {
            await client.query('BEGIN')

            const checkRes = await client.query(
                'SELECT COUNT(*) FROM playlists WHERE user_id = $1',
                [userId]
            )
            
            const playlistCount = parseInt(checkRes.rows[0].count)
            if (playlistCount >= 1) {
                throw new Error("LIMIT_REACHED") 
            }

            let imageUrl = null
            if (image) {
                imageUrl = await this.uploadPlaylistImage(image)
            }

            const playlistRes = await client.query(
                'INSERT INTO playlists (user_id, name, image_url) VALUES ($1, $2, $3) RETURNING id',
                [userId, playlistName, imageUrl]
            )
            
            const playlistId = playlistRes.rows[0].id

            if (trackId && trackId.trim() !== "") {
                await client.query(
                    'INSERT INTO playlist_tracks (playlist_id, spotify_track_id) VALUES ($1, $2)',
                    [playlistId, trackId]
                )
            }

            await client.query('COMMIT')
            return { 
                id: playlistId, 
                name: playlistName,
                image_url: imageUrl
            }
        } catch (dbError) {
            await client.query('ROLLBACK')
            throw dbError 
        } finally {
            client.release()
        }
    }

    async uploadPlaylistImage (base64Image) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                folder: 'aurora_musics_playlists', 
                resource_type: 'image'
            })

            return uploadResponse.secure_url
        } catch (error) {
            console.error("Ошибка Cloudinary:", error)
            throw new Error("Не удалось загрузить изображение в облако")
        }
    }

    async getUserPlaylists(userId) {
        try {
            const query = `
                SELECT 
                    p.id, 
                    p.name, 
                    p.image_url, 
                    p.created_at,
                    COALESCE(
                        json_agg(pt.spotify_track_id) FILTER (WHERE pt.spotify_track_id IS NOT NULL), 
                        '[]'
                    ) as tracks
                FROM playlists p
                LEFT JOIN playlist_tracks pt ON p.id = pt.playlist_id
                WHERE p.user_id = $1
                GROUP BY p.id
                ORDER BY p.created_at DESC;
            `

            const result = await pool.query(query, [userId])
            return result.rows
        } catch (error) {
            console.error("Ошибка в getUserPlaylists:", error)
            throw new Error("Не удалось загрузить плейлисты")
        }
    }

    async deletePlayList(userId , id) {
        try {
            const result = await pool.query(
                'DELETE FROM playlists WHERE id = $1 AND user_id = $2 RETURNING *',
                [id, userId]
            )

            if (result.rowCount === 0) {
                return { success: false, message: "Плейлист не найден или доступ запрещен" }
            }

            return {
                success: true
            }
        } catch(error) {
            console.error("Ошибка в PlayListService:", error);
            throw error
        }
    }

}
export default PlayListService