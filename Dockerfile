FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN apk --no-cache --virtual build-dependencies add python3 make g++ git
RUN yarn build:install

FROM node:alpine
ARG package_name
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/node_modules/@beatrice/common ./node_modules/@beatrice/common
COPY --from=base /app/packages/$package_name/package.json .
COPY --from=base /app/packages/$package_name/lib .
CMD ["yarn", "start"]
