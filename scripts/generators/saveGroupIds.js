const fs = require('fs');

const saveGroupIds = (ids, filename = './groupIds.json') => {
  if (fs.existsSync(filename)) fs.unlinkSync(filename);
  fs.appendFileSync(filename, JSON.stringify(ids));
};

module.exports = { saveGroupIds };
