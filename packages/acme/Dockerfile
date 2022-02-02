FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN apk --no-cache --virtual build-dependencies add python3 make g++ git && \
  yarn build:install

FROM node:alpine
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/acme .
CMD ["yarn", "start"]