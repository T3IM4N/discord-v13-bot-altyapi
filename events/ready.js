const chalk = require("chalk");
const fs = require("fs");
const conf = require("../configs.json");

module.exports = async (client) => {
  var log1 = await chalk.green("[------------] Asistant [-------------]");
  var log2 = await chalk.green(`]> ${client.guilds.cache.size} tane sunucuya hizmet veriyor`);
  var log3 = await chalk.green(`]> ${client.users.cache.size} kullaniciya hizmet veriyor`);
  var log4 = await chalk.green(`]> ${client.channels.cache.size} kanala hizmet veriyor`);
  var log5 = await chalk.green("]> Prefix: " + conf.prefix);
  var log6 = await chalk.green("]> Sürüm: " + conf.version);
  var log7 = await chalk.green("]> Bot ID'si: " + client.user.id);
  var log8 = await chalk.green("]> Bot Isim: " + client.user.username);
  var log9 = await chalk.green("[------------] Asistant [-------------]");

  console.log(
      log1 +
      "\n" +
      log2 +
      "\n" +
      log3 +
      "\n" +
      log4 +
      "\n" +
      log5 +
      "\n" +
      log6 +
      "\n" +
      log7 +
      "\n" +
      log8 +
      "\n" +
      log9
  );

  var rich = [
    `Devarc | ${client.guilds.cache.size} Sunucu`,
    "!yardım | !help | !discord",
  ];

  setInterval(function () {
    var random = Math.floor(Math.random() * (rich.length - 0 + 0) + 0);
    client.user.setActivity(rich[random], "online");
  }, 2 * 2500);
};
