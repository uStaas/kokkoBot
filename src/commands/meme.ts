import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import { memeAsync } from 'memejs';

export default class meme implements IBotCommand {
	private readonly _command = 'meme';

	help(): string {
		return 'Usage: $meme \n This command returns a random meme.';
	}

	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	run(args: string[], msg: Discord.Message, client: Discord.Client): void {
		let reddits = [ 'memes', 'dankmemes', 'meirl', 'me_irl', 'dankmeme', 'MemeEconomy' ];
		let subreddit = reddits[Math.floor(Math.random() * reddits.length - 1)];
		memeAsync(subreddit)
			.then((data: { title: any; subreddit: string; url: string; author: any }) => {
				const embed = new Discord.MessageEmbed()
					.setTitle(data.title)
					.setDescription(`In r/${data.subreddit} by u/${data.author}`)
					.setColor('#ffff00')
					.setImage(data.url)
					.setURL(data.url);
				msg.channel.send(embed);
			})
			.catch((e: any) => console.error(e));
	}
}
