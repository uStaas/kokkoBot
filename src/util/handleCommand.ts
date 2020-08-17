import { IBotCommand } from './api';
import * as config from '../config';
import * as Discord from 'discord.js';

export default async function handleCommand(msg: Discord.Message, commands: IBotCommand[], client: Discord.Client) {
	let command = msg.content.split(' ')[0].replace(config.PREFIX, '');
	let args = msg.content.split(' ').slice(1);
	for (const commandClass of commands) {
		try {
			if (!commandClass.isThisCommand(command.toLowerCase())) continue;
			await commandClass.run(args, msg, client);
		} catch (e) {
			console.error(e);
		}
	}
}