import * as config from './config';
import * as Discord from 'discord.js';
import { IBotCommand } from './api';
import { enabledCommands } from './enabledCommands';

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

client.on('ready', () => {
	console.log(`${client.user.tag} is ready!✅`);
});

client.login(config.SECRET);

client.on('message', (msg) => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(config.PREFIX)) return;
	handleCommand(msg);
});

async function handleCommand(msg: Discord.Message) {
	let command = msg.content.split(' ')[0].replace(config.PREFIX, '');
	let args = msg.content.split(' ').slice(1);
	for (const commandClass of commands) {
		try {
			if (!commandClass.isThisCommand(command)) continue;
			await commandClass.run(args, msg, client);
		} catch (e) {
			console.error(e);
		}
	}
}

function loadCommands(commandsPath: string) {
	if (!enabledCommands || (enabledCommands as string[]).length === 0) return;
	for (const commandName of enabledCommands) {
		const commandClass = require(`${commandsPath}/${commandName}`).default;
		const command = new commandClass() as IBotCommand;
		commands.push(command);
	}
	console.log(`${commands.length} commands loaded! ✅`);
}
