const users = [
  {
    _id: ObjectId('617fca731e438aecb185341a'),
    groupIds: [
      ObjectId('617fc99a3b6384ecb1423a86'),
      ObjectId('617fc9b00dc865ecb132524b'),
      ObjectId('617fc9bd2bc4c8ecb1bc3bd2'),
    ],
    email: 'james@predictivehire.com',
    firstName: 'James',
    lastName: 'Tan',
  },
];

db.users.drop();
db.users.insertMany(users);

const summary = {
  environment: 'DATA',
  settings: db.getCollection('users').find({}).count(),
};

printjson(summary);
