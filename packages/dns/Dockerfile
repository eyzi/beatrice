FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN apk update && apk add python make g++ && \
  apk add --no-cache git && \
  yarn build:install --scope=@beatrice/dns

FROM node:alpine
WORKDIR /app
COPY --from=base /app .