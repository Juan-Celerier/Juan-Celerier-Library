# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY domain/package.json domain/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY domain/package.json domain/

# Instalar solo dependencias de producción
RUN yarn install --frozen-lockfile --production

# Copiar archivos compilados desde builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/domain/dist ./domain/dist
COPY apps/api/data ./apps/api/data

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "apps/api/dist/src/server.js"]