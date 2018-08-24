[![CircleCI](https://circleci.com/gh/developer239/localized-graphql-koa-typescript.svg?style=svg)](https://circleci.com/gh/developer239/localized-graphql-koa-typescript) [![Test Coverage](https://api.codeclimate.com/v1/badges/fbebbe4d9b9503c0b4b6/test_coverage)](https://codeclimate.com/github/developer239/localized-graphql-koa-typescript/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/fbebbe4d9b9503c0b4b6/maintainability)](https://codeclimate.com/github/developer239/localized-graphql-koa-typescript/maintainability)

# Localized GraphQl Koa TypeScript

Example boilerplate for you next GraphQl NodeJs server. Part of the project setup is from [petrhanak/backend-typescript-boilerplate](https://github.com/petrhanak/backend-typescript-boilerplate).

**Demo** 

You can try the application [here](https://localized-graphql-koa-ts.herokuapp.com/playground) (it might take a while before the free server wakes up)

**With Multiple Languages** 🌍

By default all queries return data in english. If you want to request different translation then you have to send language code in http header:

```
{
  "language": "cs"
}
```

If you are not familiar with docker, I highly recommend using it. You can download [Docker.dmg here](https://download.docker.com/mac/stable/Docker.dmg).

All you have to do to run the application in development mode is:

1. `docker-compose up -d`
2. `make db-migrate`
3. `make db-seed`
4. Open [http://localhost:3000/playground](http://localhost:3000/playground) in your browser 

![1](https://github.com/developer239/localized-graphql-koa-typescript/blob/master/preview.gif?raw=true)

## Docker Users

You don't have to install node or postgres or any other library. Development environment is inside docker containers. `Makefile` is middleman between docker containers and our virtualized application.

**NOTE:** make sure that `CONTAINER_NAME` in `Makefile` has a correct value.

**Development:**

- `make enter` enter container terminal
- `make node_modules` reinstall node modules
- `make db-migrate` apply database migration
- `make db-rollback` rollback database migration
- `make db-reset` rollback and migrate
- `make db-seed` seed database
- `make dev` start development server

**Test**

- `make test` run tests
- `make test-coverage` run tests and report coverage

**Production:**

- `make build` build static javascript files
 
## Without Docker
 

If for some reason you can't or don't want to use docker then following instruction will guide you through the whole installation process:

**System Dependencies**

- Install node environment: `brew install node`
- Install yarn package manager: `brew install yarn`
- Install database `brew install PostgreSQL`

## Commands

**Development:**

- `yarn install` install node modules
- `yarn db:migrate` apply database migration
- `yarn db:rollback` rollback database migration
- `yarn db:reset` rollback and migrate
- `yarn db:seed` seed database
- `yarn dev` start development server

**Test**

- `yarn test` run tests
- `yarn test:coverage` run tests and report coverage

**Production:**

- `yarn build` build static javascript files

## Database

Use these commands to control `PostgreSQL` service:

1. `$ brew services start PostgreSQL`
2. `$ brew services stop PostgreSQL`
3. `$ brew services restart PostgreSQL`

**Troubleshooting**

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
If PostgreSQL stops working for no particular reason, run: `rm /usr/local/var/postgres/postmaster.pid` you can find [more information here](https://stackoverflow.com/questions/17800249/postgres-db-not-starting-on-mac-osx-error-says-connections-on-unix-domain-sock)
