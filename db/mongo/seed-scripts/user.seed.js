const users = [
  {
    _id: ObjectId("61eabede6bedc32944fd45d8"),
    email: "Alisa.Sauer@gmail.com",
    firstName: "Alisa",
    lastName: "Sauer",
    groupIds: [
      ObjectId("61eabede69f6ba8a1e95aaef"),
      ObjectId("61eabede3e95f1f7aba03f7d"),
      ObjectId("61eabedeb84e0e45de57947f"),
    ],
  },

  {
    _id: ObjectId("61eabede7a6eb4c4ac1c5564"),
    email: "Reece.Hodkiewicz@gmail.com",
    firstName: "Reece",
    lastName: "Hodkiewicz",
    groupIds: [
      ObjectId("61eabede69f6ba8a1e95aaef"),
      ObjectId("61eabeded5a987ebb9685d78"),
      ObjectId("61eabede3e95f1f7aba03f7d"),
    ],
  },

  {
    _id: ObjectId("61eabede331b595c481797e6"),
    email: "Pamela.Schuster@gmail.com",
    firstName: "Pamela",
    lastName: "Schuster",
    groupIds: [
      ObjectId("61eabede69f6ba8a1e95aaef"),
      ObjectId("61eabedeb84e0e45de57947f"),
      ObjectId("61eabede3e95f1f7aba03f7d"),
    ],
  },

  {
    _id: ObjectId("61eabede5517260a77c795e8"),
    email: "Julio.Will@gmail.com",
    firstName: "Julio",
    lastName: "Will",
    groupIds: [
      ObjectId("61eabedeb84e0e45de57947f"),
      ObjectId("61eabede71785d2323946cda"),
      ObjectId("61eabede69f6ba8a1e95aaef"),
    ],
  },

  {
    _id: ObjectId("61eabededf21ecd0a63a8132"),
    email: "Griffin.Murray@gmail.com",
    firstName: "Griffin",
    lastName: "Murray",
    groupIds: [
      ObjectId("61eabedeb84e0e45de57947f"),
      ObjectId("61eabeded5a987ebb9685d78"),
      ObjectId("61eabede3e95f1f7aba03f7d"),
    ],
  },

  {
    _id: ObjectId("61eabede929227224dee6a6a"),
    email: "Chadd.Walker@gmail.com",
    firstName: "Chadd",
    lastName: "Walker",
    groupIds: [
      ObjectId("61eabede71785d2323946cda"),
      ObjectId("61eabede3e95f1f7aba03f7d"),
      ObjectId("61eabede69f6ba8a1e95aaef"),
    ],
  },

  {
    _id: ObjectId("61eabede796d1a497f51f9ba"),
    email: "Lenna.Ritchie@gmail.com",
    firstName: "Lenna",
    lastName: "Ritchie",
    groupIds: [
      ObjectId("61eabeded5a987ebb9685d78"),
      ObjectId("61eabedeb84e0e45de57947f"),
      ObjectId("61eabede71785d2323946cda"),
    ],
  },

  {
    _id: ObjectId("61eabedeaf30037a9a1d4868"),
    email: "Wade.Wolff@gmail.com",
    firstName: "Wade",
    lastName: "Wolff",
    groupIds: [
      ObjectId("61eabedeb84e0e45de57947f"),
      ObjectId("61eabede71785d2323946cda"),
      ObjectId("61eabeded5a987ebb9685d78"),
    ],
  },

  {
    _id: ObjectId("61eabedea26ecf0fc7ee20fa"),
    email: "Ila.Balistreri@gmail.com",
    firstName: "Ila",
    lastName: "Balistreri",
    groupIds: [
      ObjectId("61eabeded5a987ebb9685d78"),
      ObjectId("61eabede71785d2323946cda"),
      ObjectId("61eabedeb84e0e45de57947f"),
    ],
  },

  {
    _id: ObjectId("61eabede892d0246ddcac97d"),
    email: "Catherine.Beier@gmail.com",
    firstName: "Catherine",
    lastName: "Beier",
    groupIds: [
      ObjectId("61eabedeb84e0e45de57947f"),
      ObjectId("61eabede3e95f1f7aba03f7d"),
      ObjectId("61eabeded5a987ebb9685d78"),
    ],
  },
];
db.users.drop();
db.users.insertMany(users);

const summary = {
  environment: "DATA",
  settings: db.getCollection("users").find({}).count(),
};

printjson(summary);
