const groups = [
  {
    _id: ObjectId('617fc99a3b6384ecb1423a86'),
    name: 'Recruiter',
  },
  {
    _id: ObjectId('617fc9b00dc865ecb132524b'),
    name: 'Hiring Manager',
  },
  {
    _id: ObjectId('617fc9bd2bc4c8ecb1bc3bd2'),
    type: 'group',
    name: 'PH Super Admin',
  },
];

db.groups.drop();
db.groups.insertMany(groups);

const summary = {
  environment: 'DATA',
  settings: db.getCollection('groups').find({}).count(),
};

printjson(summary);
