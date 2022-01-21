const ObjectId = (s = (s) => Math.floor(s).toString(16)) =>
  s(Date.now() / 1000) +
  " ".repeat(16).replace(/./g, () => s(Math.random() * 16));

module.exports = { ObjectId };
