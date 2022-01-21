const faker = require("@faker-js/faker");
const fs = require("fs");
const { ObjectId } = require("./utils");

const generateGroup = () => {
  const name = faker.name.jobTitle();
  const _id = ObjectId();
  return { _id, name };
};

const saveGroupsSeedScript = (
  count = 1,
  filename = "./db/mongo/seed-scripts/group.seed.js"
) => {
  // clean before creation
  if (fs.existsSync(filename)) fs.unlinkSync(filename);

  const prefix = `
    const groups = [
  `;
  fs.appendFileSync(filename, prefix);

  const groupsIdsPool = [];
  for (let i = 0; i < count; i++) {
    const group = generateGroup();

    groupsIdsPool.push(group._id);

    const groupInPlainStr = `
     {
        _id: ObjectId("${group._id}"),
        name: "${group.name}"
     },
    `;
    fs.appendFileSync(filename, groupInPlainStr);
  }

  const suffix = `
      ]
    db.groups.drop();
    db.groups.insertMany(groups);
    
    const summary = {
      environment: "DATA",
      settings: db.getCollection("groups").find({}).count(),
    };
    
    printjson(summary);
  `;
  fs.appendFileSync(filename, suffix);
  return groupsIdsPool;
};

module.exports = { saveGroupsSeedScript };
