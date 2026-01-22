# Basis-Image
FROM node:18 as builder

# Arbeitsverzeichnis im Container
WORKDIR /app

# Paketdateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Restliche Dateien kopieren
COPY . .

# React-Entwicklungsserver soll auf 0.0.0.0 lauschen, nicht localhost!
#ENV HOST 0.0.0.0
#ENV PORT 3000

# Exponiere Port 3000
#EXPOSE 3000

# Startbefehl
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
