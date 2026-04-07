FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

RUN npm ci && cd server && npm ci && cd ../client && npm ci

COPY . .

RUN cd client && npm run build

EXPOSE 5000

CMD ["node", "server/index.js"]
