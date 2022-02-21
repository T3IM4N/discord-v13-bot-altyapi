exports.run = async(client, message, args, conf, Discord, functions) => {
  let msg = args.join(" ");
  if(!msg) return functions.messageSend(message, "Hata!", "Mesaj kısmını boş bırakamazsın.", conf.errorcolor);
  functions.messageSend(message, "Test", msg, conf.maincolor);
};

exports.conf = {
  aliases: ["t"],
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: 'test komutu',
  usage: 'test'
};
