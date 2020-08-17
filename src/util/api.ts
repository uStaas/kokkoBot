import * as Discord from 'discord.js';

export interface IBotCommand {
	[x: string]: any;
	help(): string;
	usage(): string;
	nsfw(): boolean;
	isThisCommand(command: string): boolean;
	run(args: string[], msg: Discord.Message, client: Discord.Client): void;
}
