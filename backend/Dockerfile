# Verwende das offizielle Node.js-Image als Basis
FROM node:latest

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /app

# Kopiere package.json und package-lock.json und installiere Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopiere den Rest der Dateien in das Arbeitsverzeichnis des Containers
COPY . .

# Öffne den Port, auf dem der Node.js-Server lauscht
EXPOSE 8000

# Starte den Node.js-Server
CMD ["npm", "start"]