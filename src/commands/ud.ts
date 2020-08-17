import * as Discord from 'discord.js';
import { IBotCommand } from '../util/api';
import { term } from 'urban-dictionary';
import * as config from '../config'

export default class ud implements IBotCommand {
	private readonly _command = 'ud';

	help(): string {
		return 'This command fetches a definition for the given term from Urban Dictionary.';
	}

	usage(): string {
		return `Usage: ${config.PREFIX + this._command} some_term`;
	}

	nsfw(): boolean {
		return false;
	}


	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	run(args: string[], msg: Discord.Message, client: Discord.Client): void {
		let embed = new Discord.MessageEmbed();
		embed.setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/UD_logo-01.svg/1200px-UD_logo-01.svg.png')
			.setFooter('Thelw na piw nero © 2020', client.user.avatarURL())
			.setTimestamp();
		term(args.join(' '), (error, entries, tags, sounds) => {
			if (error) {
				embed.setColor('#ff0000')
					.setTitle('Error')
					.setDescription(`${msg.author}, no such definition on Urban Dictionary`)
			} else {
				embed.setColor('#2222ff')
					.setTitle(entries[0].word)
					.setURL(entries[0].permalink)
					.addFields({ name: 'Definition', value: entries[0].definition },
						{ name: 'Example', value: entries[0].example }
					)

			}
			msg.channel.send(embed);
		});
	}
}
