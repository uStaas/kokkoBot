import * as config from './config';
import * as Discord from 'discord.js';
import * as util from './util';
const client: Discord.Client = new Discord.Client();

let commands: util.IBotCommand[] = util.loadCommands(`${__dirname}/commands`);

client.on('ready', () => {
	console.log(`${client.user.tag} is ready!✅`);
});

client.login(config.SECRET);

client.on('message', (msg) => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(config.PREFIX)) return;
	util.handleCommand(msg, commands, client);
});

export default commands;