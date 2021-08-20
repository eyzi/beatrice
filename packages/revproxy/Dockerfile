FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN yarn build:install --scope=@beatrice/revproxy

FROM node:alpine
WORKDIR /app
COPY --from=base /app .