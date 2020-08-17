import * as Discord from 'discord.js';
import { IBotCommand } from '../util/api';
import { memeAsync } from 'memejs';
import * as config from '../config';

export default class meme implements IBotCommand {
	private readonly _command = 'meme';

	help(): string {
		return 'This command returns a random meme.';
	}

	usage(): string {
		return `Usage: ${config.PREFIX + this._command}`;
	}

	nsfw(): boolean {
		return false;
	}


	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	run(args: string[], msg: Discord.Message, client: Discord.Client): void {
		let subreddit = config.memeReddits[Math.floor(Math.random() * config.memeReddits.length - 1)];
		memeAsync(subreddit)
			.then((data: { title: string; subreddit: string; url: string; author: string }) => {
				const embed = new Discord.MessageEmbed()
					.setTitle(data.title)
					.setDescription(`In r/${data.subreddit} by u/${data.author}`)
					.setColor('#ffff00')
					.setImage(data.url)
					.setFooter('Thelw na piw nero © 2020', client.user.avatarURL())
					.setURL(data.url);
				msg.channel.send(embed);
			}).catch((e: any) => console.error(e));
	}
}
