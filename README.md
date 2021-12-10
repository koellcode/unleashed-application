## Getting Started

First, install:

```bash
yarn install
```

Second, run the development server:

```bash
yarn dev:server
```


the express instance runs on http://127.0.0.1:3000


## Tests

test is implemented with Cypress.io in a very basic manner (no data cleanup, not repeatable). To repeat the test you need to reset the git repository locally (to reset the sqlite container)

Executing Tests (Headlesss):

```bash
yarn run cypress run
```

Executing Tests (Browser of your choice):

```bash
yarn run cypress start
```
