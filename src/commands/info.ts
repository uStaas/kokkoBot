import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import * as config from '../config';

export default class info implements IBotCommand {
	private readonly _command = 'info';

	help(): string {
		return 'Usage: $info \n This command gives some info about the server.';
	}

	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	run(args: string[], msg: Discord.Message, client: Discord.Client): void {
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Info')
			.setDescription(
				'We are currently working our hardest to implement and document features. Come back soon, not!'
			)
			.addFields({ name: 'And then he turned himself into a pickle', value: "funniest thing I've ever seen" })
			.setAuthor(client.user.tag)
			.setThumbnail(config.THUMBNAIL)
			.setImage(config.INFOIMAGE)
			.setFooter('Thelw na piw nero © 2020')
			.setTimestamp();
		msg.channel.send(embed);
	}
}
