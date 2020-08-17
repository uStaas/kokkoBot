import * as Discord from 'discord.js';
import { IBotCommand } from '../util/api';
import * as config from '../config';

export default class roll implements IBotCommand {
	private readonly _command = 'roll';

	help(): string {
		return 'This command rolls a number between from 1 to the number given.';
	}

	usage(): string {
		return `Usage: ${config.PREFIX + this._command} number`;
	}

	nsfw(): boolean {
		return false;
	}


	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	run(args: string[], msg: Discord.Message, client: Discord.Client): void {
		let randomNumber = Math.floor(Math.random() * parseInt(args[0])) + 1;
		let embed = new Discord.MessageEmbed().setTimestamp();;
		if (!(Array.isArray(args) && args.length) || parseInt(args[0]) <= 1) {
			embed.setColor('#ff0000')
				.setTitle(`You have to specify a number > 1 to roll from!`)
				.setImage(client.user.avatarURL())
				.setFooter('Thelw na piw nero © 2020', client.user.avatarURL())
				.setDescription(`${msg.author}\n${this.help()}`);
		} else {
			embed.setColor('#228522')
				.setTitle('Roll')
				.setFooter('Thelw na piw nero © 2020', client.user.avatarURL())
				.setDescription(`${msg.author} rolled ${randomNumber} out of ${args[0]}!`)
		}
		msg.channel.send(embed);
	}
}
