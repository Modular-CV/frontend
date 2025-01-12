FROM node:23-alpine3.20
WORKDIR /app
COPY yarn.lock package.json ./
RUN corepack enable && corepack use yarn@latest
COPY . ./
RUN yarn install
CMD ["yarn", "dev", "--host", "0.0.0.0"]