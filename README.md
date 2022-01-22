

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

## Generate Fake Data
```sh
yarn project generateSeedScripts
yarn project seed
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

## Field Resolver and Data Loader

### Business Context
- One group could have many users.
- One user could belongs to multiple groups
- The relationship between group and user is managed in the user side only. User has one field called `groupIds` (we will migrate to userGroupMapping collections to manage the relationship in future)
- **We want to get a group with number of users**
- **We want to get a list groups with number of users of each group**