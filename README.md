

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

## Monitor MongoDB
```sh
# will pop up an url for monitoring data
db.enableFreeMonitoring() 
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


### Analysis
- Data loader cannot improve the performance
- When you fetch user detail (e.g firstName, lastName and email) via groups, the code might send same DB query since some user might in multiple groups, dataloader could help the de-duplicate the db query and improvement the performance
- But in this business context, you need a statistic metric called `userCount`, so the fanned out queries have no duplicate identifiers. In this scenario, it's better to optimise the performance by merge multiple queries into one in the database level. (in relational database, it' probably the `join` operation)

### Traps
- index on nested array allows duplicates inside.

### Experiment Data
- 2000 groups, 20000 users
- query by 2000 groupIds
- avg time: `350ms`

## Reference
- [Can graphql return aggregate counts?](https://stackoverflow.com/questions/34321688/can-graphql-return-aggregate-counts)
- [Mongoose Virtual](https://github.com/Automattic/mongoose/issues/5762)