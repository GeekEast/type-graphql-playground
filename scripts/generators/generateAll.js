const { saveGroupsSeedScript } = require('./generateGroups');
const { saveUsersAsSeedScript } = require('./generateUsers');
const { saveGroupIds } = require('./saveGroupIds');

const groupIdsPool = saveGroupsSeedScript(process.env.GROUPS_COUNT);

// save group ids for easy copying and profiling
saveGroupIds(groupIdsPool);

saveUsersAsSeedScript(process.env.USERS_COUNT, groupIdsPool);
