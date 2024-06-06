# Verwende das offizielle Node.js-Image als Basis
FROM node:latest AS builder

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /app

# Kopiere package.json und package-lock.json und installiere Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopiere den Rest der Dateien in das Arbeitsverzeichnis des Containers
COPY . .

# Baue die React-App
RUN npm run build

# Proxy
FROM nginx:1.21.0-alpine AS production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
