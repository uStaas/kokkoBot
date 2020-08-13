import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

import { term } from 'urban-dictionary';

export default class ud implements IBotCommand {
	private readonly _command = 'ud';

	help(): string {
		return 'Usage: $ud <word/phrase/slang> \n\n This command fetches a definition for the given word from Urban Dictionary.';
	}

	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	run(args: string[], msg: Discord.Message, client: Discord.Client): void {
		let embed = new Discord.MessageEmbed();
		term(args.join(' '), (error, entries, tags, sounds) => {
			if (error) {
				embed
					.setImage(
						'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/UD_logo-01.svg/1200px-UD_logo-01.svg.png'
					)
					.setColor('#ff0000')
					.setTitle('Error')
					.setDescription(`${msg.author}, no such definition on Urban Dictionary`);
			} else {
				embed
					.setURL(entries[0].permalink)
					.setImage(
						'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/UD_logo-01.svg/1200px-UD_logo-01.svg.png'
					)
					.setColor('#2222ff')
					.setTitle(entries[0].word)
					.addFields(
						{
							name: 'Definition',
							value: entries[0].definition
						},
						{
							name: 'Example',
							value: entries[0].example
						}
					)
					.setTimestamp();
			}
			msg.channel.send(embed);
		});
	}
}
