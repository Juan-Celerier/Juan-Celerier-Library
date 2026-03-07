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

COPY apps/web/package.json apps/web/

# Instalar solo dependencias de producción
RUN yarn install --frozen-lockfile --production --workspace-root false && \
    cd apps/web && yarn install --frozen-lockfile --production

# Copiar archivos compilados desde builder
COPY --from=builder /app/apps/web/dist ./apps/web/dist

EXPOSE 4173

ENV NODE_ENV=production

CMD ["yarn", "workspace", "web", "preview", "--host"]