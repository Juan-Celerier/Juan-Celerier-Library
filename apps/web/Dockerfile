FROM node:20

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY domain/package.json domain/package.json

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["yarn", "workspace", "web", "dev", "--host"]