# Verwende das offizielle Node.js-Image als Basis
FROM node:latest

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /usr/src/app/backend

# Kopiere package.json und package-lock.json und installiere Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopiere den Rest der Dateien in das Arbeitsverzeichnis des Containers
COPY . .

# Baue die React-App
RUN npm run build

# Öffne den Port, auf dem der Node.js-Server lauscht
EXPOSE 8080

# Starte den Node.js-Server
CMD ["node", "app.js"]
