import * as Discord from 'discord.js';

export interface IBotCommand {
	help(): string;
	isThisCommand(command: string): boolean;
	run(args: string[], msg: Discord.Message, client: Discord.Client): void;
}
