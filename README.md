## Project Flow

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker run database

```bash
# sudo docker run --rm --name projectflow-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123456 -v /mnt/c/Users/odont/IdeaProjects/project-flow/postgres:/var/lib/postgresql/data -d postgres
```
