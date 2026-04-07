FROM node:20-alpine

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies in order
RUN cd server && npm install --production && cd ..

# Copy client for build
COPY client/src ./client/src
COPY client/public ./client/public
COPY client/*.html ./client/
COPY client/*.js ./client/
COPY client/postcss.config.js ./client/
COPY client/tailwind.config.js ./client/

# Install client dependencies and build
RUN cd client && npm install && npm run build

# Copy rest of server files after client build
COPY server/middleware ./server/middleware
COPY server/models ./server/models
COPY server/routes ./server/routes
COPY server/config ./server/config
COPY server/index.js ./server/

EXPOSE 5000

CMD ["node", "server/index.js"]
