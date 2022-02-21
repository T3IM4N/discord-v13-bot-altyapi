exports.run = async(client, message, args, conf, Discord, functions) => {
  functions.messageSend(message, "Deneme", "Deneme123", conf.maincolor);
};

exports.conf = {
  aliases: ["d"],
  permLevel: 0
};

exports.help = {
  name: 'deneme',
  description: 'deneme komutu',
  usage: 'deneme'
};
