import * as Discord from 'discord.js';
import { IBotCommand } from '../util/api';
import * as config from '../config';

export default class info implements IBotCommand {
	private readonly _command = 'info';

	help(): string {
		return 'This command returns some information about the server.';
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
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`📊  ${msg.guild.name} Statistics`)
			.setAuthor(client.user.tag, client.user.avatarURL())
			.setThumbnail(msg.guild.owner.user.avatarURL())
			.addFields(
				{ name: 'Server Owner', value: ` 👉 ** ${msg.guild.owner.nickname} (${msg.guild.owner.user.tag}) **`, inline: false },
				{ name: '\u200B', value: '\u200B' },
				{ name: `🔴 Total members ${msg.guild.memberCount}`, value: '\u200B', inline: true },
				{ name: `🟢 Online: ${msg.guild.members.cache.filter(member => member.presence.status !== "offline").size}`, value: '\u200B', inline: true },
				{ name: `📅 Server creation date: ${msg.guild.createdAt.toUTCString()}`, value: '\u200B', inline: false }
			)
			.setImage(client.user.avatarURL())
			.setTimestamp()
			.setFooter('Thelw na piw nero © 2020', client.user.avatarURL());
		// .setColor('#0099ff')
		// .setTitle('Info')
		// .addFields({ name: '👊 Server Name', value: msg.member.guild.name },
		// 	{ name: '👉 Owner', value: `${msg.member.guild.owner.nickname} (${msg.member.guild.owner.user.tag})`, inline: true })
		// .addField({ name: '🔴 Total members', value: msg.member.guild.memberCount },
		// 	{ name: '👉 Owner', value: `${msg.member.guild.owner.nickname} (${msg.member.guild.owner.user.tag})` })
		// .setAuthor(client.user.tag, client.user.avatarURL())
		// .setThumbnail()
		// .setFooter('Thelw na piw nero © 2020')
		// .setTimestamp();
		msg.channel.send(embed);
	}
}
