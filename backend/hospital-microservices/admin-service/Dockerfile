FROM node:18-alpine
WORKDIR /usr/src/app

# Instalación de dependencias con cache optimizada
COPY package*.json ./
RUN npm install --production && \
    npm cache clean --force

# Copiar configuración y código del servicio
COPY config ./config
COPY admin-service/ .  

# Saludable defaults para producción
USER node
EXPOSE 3001
CMD ["node", "server.js"]
