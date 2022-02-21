const reqEvent = (event) => require(`../events/${event}`);
const conf = require("../configs.json");

module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('messageCreate', reqEvent('messageCreate'));
  client.on('disconnect', reqEvent('disconnect'));
  client.on('reconnecting', reqEvent('reconnecting'));
  client.on('warn', reqEvent('warn'));
  client.on('error', reqEvent('error'));
};
