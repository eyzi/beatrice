FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install -g lerna typescript \
	&& yarn build:install --scope=@beatrice/dns