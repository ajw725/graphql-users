# GraphQL tutorial

## Project usage

1. Run `yarn install` to install dependencies
1. Run `yarn db:start` to start the JSON db. It will start on port 3000 by default.
1. In a new window, run `yarn start:dev` to start the server in development mode. It will start on port 4000 by default.
1. In your browser, go to `http://localhost:4000/graphql`. This will bring up the GraphiQL query interface.

## Example queries

```graphql
{
    user(id: "23") {
        firstName
        age
        company {
            name
        }
    }
}
```

```graphql
query findCompanies {
    companies {
        name
        users {
            firstName
        }
    }
}
```