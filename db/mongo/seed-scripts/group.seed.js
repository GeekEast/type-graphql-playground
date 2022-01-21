const groups = [
  {
    _id: ObjectId("61eabede69f6ba8a1e95aaef"),
    name: "Legacy Division Assistant",
  },

  {
    _id: ObjectId("61eabedeb84e0e45de57947f"),
    name: "Internal Directives Producer",
  },

  {
    _id: ObjectId("61eabede71785d2323946cda"),
    name: "Direct Paradigm Developer",
  },

  {
    _id: ObjectId("61eabeded5a987ebb9685d78"),
    name: "Product Web Consultant",
  },

  {
    _id: ObjectId("61eabede3e95f1f7aba03f7d"),
    name: "Central Group Producer",
  },
];
db.groups.drop();
db.groups.insertMany(groups);

const summary = {
  environment: "DATA",
  settings: db.getCollection("groups").find({}).count(),
};

printjson(summary);
