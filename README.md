

# Type-graphql Playground
  - [Kick off](#kick-off)
  - [Graphql example](#graphql-example)
  - [Regenerate Data](#regenerate-data)
  - [Statistics](#statistics)
  - [Next Phase](#next-phase)
## Kick off
```sh
# install dependency
yarn install

# compose docker
yarn project up

# start graphql server
yarn start
```

## Graphql example
- query http://localhost:12305/graphql
```graphql
query GetGroup($getGroupFilter: GetGroupDto!) {
  GetGroup(filter: $getGroupFilter) {
    _id
    name
    userCount
  }
}

# query with datalodare loadMany() without aggregation help
query GetGroups($getGroupsFilter: GetGroupsDto!) {
  GetGroups(filter: $getGroupsFilter) {
    _id
    name
    userCount
    users {
      _id
      email
      firstName
      lastName
    }
  }
}

# query with dataloader load() method with optmized mongo aggregation query
query GetGroupsViaSingleMongoQuery(
  $getGroupsFilterViaSingleMongoQuery: GetGroupsDto!
) {
  GetGroups(filter: $getGroupsFilterViaSingleMongoQuery) {
    _id
    name
    userCount
    users2 {
      _id
      email
      firstName
      lastName
    }
  }
}
```
- variables: ids is stored in generated `groupIds.json` in project root directory
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
  "getGroupsFilterViaSingleMongoQuery": {
    "_ids": [
      "61eabfc67d720e6372867487"
    ]
  }
}
```

## Regenerate Data
```sh
# generate the seed scripts
yarn project generateSeedScripts

# seed data to mongodb
yarn project seed

# create indices
yarn project index
```

## Statistics
- for query `2000` **groups** with **users**  as sub-document in graphql
- dataloader has two main functionalities here: **batch** requests (deduplicate) and **cache** request (memory)
- 
| Data Loader method  | Aggregation Query | Plain Query |  Time Consumed  | use case                            |
| :-----------------: | :---------------: | :---------: | :-------------: | ----------------------------------- |
|   `load(groupId)`   |        ✅         |             |  `600-1000ms`   | huge amount of fanned out promises  |
| `loadMany(userIds)` |                   |     ✅      | `30000-60000ms` | small amount of fanned out promises |


## Take away
- Graphql **Flexibility**: Favor `field resolver` to assemble **exterior** fields over assembling in `service` layer.
- Delegate **cumbersome** assembling logic from `field resolver` to mongodb `aggregate pipeline`.



## Next Phase
- How to do performant sorting in graphql layer since field resolver happens after data get fetched from database?