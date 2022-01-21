const { saveGroupsSeedScript } = require('./generateGroups');
const { saveUsersAsSeedScript } = require('./generateUsers');

const groupIdsPool = saveGroupsSeedScript(process.env.GROUPS_COUNT);
saveUsersAsSeedScript(process.env.USERS_COUNT, groupIdsPool);
