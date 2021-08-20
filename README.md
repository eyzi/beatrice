# beatrice

Home Server

![Build Test](https://github.com/eyzi/beatrice/actions/workflows/yarn.yml/badge.svg)

## Requirements

Docker

## Usage

Create `.env` file for each package except `common` with an environment variable for mongodb connection

```
DB_STRING=mongo://xxx
```

Then on workspace root, run the following command:

```
yarn deploy:all
```

## Ports

_Can be changed in each package's docker-compose.yml file_

DNS server: 2053
DNS server API: 9053
Revproxy server (HTTP): 80
Revproxy server (HTTPS): 443
Revproxy server API: 9054
ACME server API: 9055
