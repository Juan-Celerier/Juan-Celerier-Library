# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY domain/package.json domain/

RUN yarn install

COPY . .

RUN yarn build

# Etapa de producción con Nginx
FROM nginx:alpine

WORKDIR /app

# Copiar archivos compilados desde builder
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
