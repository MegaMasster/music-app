interface SpotifyArtist {
    name: string
    id?: string
}

interface SpotifyImage {
    url: string
    height?: number
    width?: number
}

interface SpotifyAlbum {
    images: SpotifyImage[]
    name: string
}

export interface SpotifyTrackItem {
    id: string
    name: string
    artists: SpotifyArtist[],
    album: SpotifyAlbum
}

export interface SpotifyResponse {
    tracks: {
        items: SpotifyTrackItem[]
        total: number
        limit: number
    } 
}
