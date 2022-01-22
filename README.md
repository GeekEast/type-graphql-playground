

# Type Graphql Playground

## Kick off
```sh
# install dependency
yarn install

# compose docker
yarn project up

# start graphql server
yarn start
```

## Example Query
- query
```graphql
query GetGroup($getGroupFilter: GetGroupDto!) {
  GetGroup(filter: $getGroupFilter) {
    _id
    name
  }
}

query GetGroups($getGroupsFilter: GetGroupsDto!) {
  GetGroups(filter: $getGroupsFilter) {
    _id
    name
  }
}

query GetUser($getUserFilter: GetUserDto!) {
  GetUser(filter: $getUserFilter) {
    _id
    email
    firstName
    lastName
    groupIds
  }
}

query GetUsers($getUsersDto: GetUsersDto!) {
  GetUsers(filter: $getUsersDto) {
    _id
    email
    firstName
    lastName
    groupIds
  }
}
```
- variables: fill the ids by looking up `db/seed-scripts/*.seed.js`
```json
{
  "getGroupFilter": {
    "_id": "61eabfc67d720e6372867487"
  },
  "getGroupsFilter": {
    "_ids": [
      "61eabfc67d720e6372867487"
    ]
  },
  "getUserFilter": {
    "_id": "61eabfc6b276ca2b9a87cad3"
  },
  "getUsersDto": {
    "_ids": [
      "61eabfc6b276ca2b9a87cad3"
    ]
  }
}
```