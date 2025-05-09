FROM node:18.20.8-alpine
WORKDIR /usr/src/app

# Instalación de dependencias con cache optimizada
COPY package*.json ./
RUN npm install && \
    npm cache clean --force

# Copiar todo el código fuente
COPY . .

# Limpiar caché y archivos temporales
RUN rm -rf /tmp/* && \
    rm -rf /var/tmp/*

# Saludable defaults para producción
USER node
EXPOSE 3002
CMD ["node", "server.js"]
