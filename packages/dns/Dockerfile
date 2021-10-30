FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN apk --no-cache --virtual build-dependencies add python3 make g++ git && \
  yarn build:install --scope=@beatrice/dns

FROM node:alpine
WORKDIR /app
COPY --from=base /app .