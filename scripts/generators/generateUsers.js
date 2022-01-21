const faker = require("@faker-js/faker");
const { ObjectId } = require("./utils");

const generateUser = (groupIdsPool = []) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}.${lastName}@gmail.com`;
  const groupIds = groupIdsPool.sort(() => 0.5 - Math.random()).slice(0, 3);
  const _id = ObjectId();
  return { _id, email, firstName, lastName, groupIds };
};

const saveUsersAsSeedScript = (
  count = 1,
  groupIdsPool = [],
  filename = "./db/mongo/seed-scripts/user.seed.js"
) => {
  const fs = require("fs");

  // clean before creation
  if (fs.existsSync(filename)) fs.unlinkSync(filename);

  const prefix = `
    const users = [
  `;
  fs.appendFileSync(filename, prefix);
  for (let i = 0; i < count; i++) {
    const user = generateUser(groupIdsPool);
    const userData = `
     {
        _id: ObjectId("${user._id}"),
        email: "${user.email}",
        firstName: "${user.firstName}",
        lastName: "${user.lastName}",
        groupIds: [${user.groupIds.map((id) => `ObjectId("${id}")`)}]
     },
    `;
    fs.appendFileSync(filename, userData);
  }
  const suffix = `
    ]
    db.users.drop();
    db.users.insertMany(users);
    
    const summary = {
      environment: "DATA",
      settings: db.getCollection("users").find({}).count(),
    };
    
    printjson(summary);
  `;
  fs.appendFileSync(filename, suffix);
};

module.exports = { saveUsersAsSeedScript };
