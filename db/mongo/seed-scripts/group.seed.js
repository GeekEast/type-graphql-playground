const groups = [
  {
    _id: ObjectId("61eabfc6d10d64a10a572b50"),
    name: "Chief Markets Manager",
  },

  {
    _id: ObjectId("61eabfc6e3d3ae991f4f2330"),
    name: "Customer Configuration Coordinator",
  },

  {
    _id: ObjectId("61eabfc6903d83df3a7bc87f"),
    name: "Internal Accounts Technician",
  },

  {
    _id: ObjectId("61eabfc6e4ce6791061d66f9"),
    name: "Future Implementation Facilitator",
  },

  {
    _id: ObjectId("61eabfc6602b8f97bcc6b2bc"),
    name: "Chief Infrastructure Technician",
  },

  {
    _id: ObjectId("61eabfc642de6e93efb96d3e"),
    name: "Human Brand Developer",
  },

  {
    _id: ObjectId("61eabfc67d720e6372867487"),
    name: "Human Data Associate",
  },

  {
    _id: ObjectId("61eabfc641d9c262f9bc53c0"),
    name: "Chief Integration Associate",
  },

  {
    _id: ObjectId("61eabfc6a125f645032bb623"),
    name: "Dynamic Optimization Architect",
  },

  {
    _id: ObjectId("61eabfc6c9f080e8205e9d89"),
    name: "International Intranet Representative",
  },

  {
    _id: ObjectId("61eabfc67e063047a9d76b5f"),
    name: "Forward Accountability Specialist",
  },

  {
    _id: ObjectId("61eabfc64f9a1bba4309de7f"),
    name: "National Solutions Officer",
  },

  {
    _id: ObjectId("61eabfc65237eda46474adde"),
    name: "National Infrastructure Associate",
  },

  {
    _id: ObjectId("61eabfc6017f8a481f6fcc24"),
    name: "Central Security Liaison",
  },

  {
    _id: ObjectId("61eabfc62705ebcbd92397ea"),
    name: "District Mobility Engineer",
  },

  {
    _id: ObjectId("61eabfc6c6b1ae53b98dcab2"),
    name: "Regional Communications Associate",
  },

  {
    _id: ObjectId("61eabfc651a617fcbff3f60c"),
    name: "Legacy Data Director",
  },

  {
    _id: ObjectId("61eabfc635db24d124d489ef"),
    name: "Future Research Specialist",
  },

  {
    _id: ObjectId("61eabfc638a802865711a749"),
    name: "Regional Applications Liaison",
  },

  {
    _id: ObjectId("61eabfc68301a619ceced0d1"),
    name: "Central Division Coordinator",
  },
];
db.groups.drop();
db.groups.insertMany(groups);

const summary = {
  environment: "DATA",
  settings: db.getCollection("groups").find({}).count(),
};

printjson(summary);
