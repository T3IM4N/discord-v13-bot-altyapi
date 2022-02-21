const Discord = require('discord.js');
const config = require('./configs.json');
const moment = require('moment');
const fs = require('fs');
const chalk = require('chalk');
const { green } = require('chalk');
const client = new Discord.Client({
	intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});


require('./utils/eventloader')(client);

const Logger = (message, type = false) => {
    type == true ? console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`) : console.log(message);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const commandspath = "./commands/";
fs.readdir(commandspath, (err, categry) => {
    if (err) console.error(err);
    Logger(`${categry.length} adet kategori yüklendi.`);
    for (const category of categry) {
        fs.readdir(`${commandspath+category}/`, (err, files) => {
            if (err) console.error(err);
            for (const file of files) {
                let props = require(`${commandspath+category}/${file}`);
                let prmlvlcolor = chalk.white;
                if (props.conf.permLevel >= 1 && props.conf.permLevel <= 3) prmlvlcolor = chalk.green;
                else if (props.conf.permLevel >= 4 && props.conf.permLevel <= 6) prmlvlcolor = chalk.blue;
                else if (props.conf.permLevel >= 7 && props.conf.permLevel <= 8) prmlvlcolor = chalk.yellow;
                else if (props.conf.permLevel == 9) prmlvlcolor = chalk.red;
                Logger(`Yüklenen komut: [${chalk.blue(category)}][${prmlvlcolor(props.conf.permLevel)}][${chalk.bold(props.help.name)}(${chalk.magenta(file)})]-(${chalk.green(props.help.description)})`);
                client.commands.set(props.help.name, props);
                for (const alias of props.conf.aliases) {
                    client.aliases.set(alias, props.help.name);
                }
            }
        });
    }
});

client.elevation = message => {
    if(!message.guild) return;
    let permlvl = 0;
    if (message.member.bot) permlvl = -1;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) permlvl = 1;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.VIEW_CHANNEL)) permlvl = 2;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) permlvl = 3;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) permlvl = 4;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) permlvl = 5;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.VIEW_AUDIT_LOG)) permlvl = 6;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) permlvl = 7;
    if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) permlvl = 8;
    if (message.author.id === config.owner) permlvl = 9;
    return permlvl;
};

client.login(config.token);