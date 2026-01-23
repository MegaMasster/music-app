FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY server/package*.json ./
RUN npm install --omit=dev
COPY server/ .
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "server.js"]