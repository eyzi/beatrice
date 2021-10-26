FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN apk add --no-cache git && yarn build:install --scope=@beatrice/acme

FROM node:alpine
WORKDIR /app
COPY --from=base /app .