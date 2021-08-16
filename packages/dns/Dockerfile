FROM node:latest
WORKDIR /app
RUN npm install -g lerna typescript
COPY . .
RUN yarn build:install --scope=@beatrice/dns