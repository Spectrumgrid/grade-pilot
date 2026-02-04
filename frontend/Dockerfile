# Etapa 1: Construcción
FROM node:20-alpine as build-stage

WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Argumento de construcción para la URL de la API (opcional si se usa el proxy de nginx)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Construir la aplicación
RUN npm run build

# Etapa 2: Servidor
FROM nginx:stable-alpine as production-stage

# Crear carpeta /gradepilot
RUN mkdir -p /usr/share/nginx/html/gradepilot

# Copiar build dentro de /gradepilot
COPY --from=build-stage /app/dist /usr/share/nginx/html/gradepilot

# Copiar configuración nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
