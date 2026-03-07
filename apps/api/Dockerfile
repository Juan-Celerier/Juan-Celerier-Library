FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY domain/package.json domain/package.json

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["node", "apps/api/dist/apps/api/src/server.js"]