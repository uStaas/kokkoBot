import * as Discord from 'discord.js';
import { IBotCommand } from '../util/api';
import * as config from '../config';

export default class addrole implements IBotCommand {
	private readonly _command = 'addrole';

	private checkPermissionRole(role: Discord.Role): boolean {
		return role.permissions.has('ADMINISTRATOR') || role.permissions.has('MANAGE_ROLES');
	}

	help(): string {
		return 'This command adds you to the role(s) specified.';
	}

	usage(): string {
		return `Usage: ${config.PREFIX + this._command} Role [Role2,Role3...]`;
	}

	nsfw(): boolean {
		return false;
	}


	isThisCommand(command: string): boolean {
		return command === this._command;
	}

	async run(args: string[], msg: Discord.Message, client: Discord.Client) {
		let { cache } = msg.guild.roles;
		for (const currRole of args) {
			let role = cache.find((role) => role.name.toLowerCase() === currRole.toLowerCase());
			let embed = new Discord.MessageEmbed();
			if (role) {
				if (msg.member.roles.cache.has(role.id)) {
					embed
						.setColor('#ff0000')
						.setTitle('Error')
						.setDescription(`${msg.author}, you are already in that group!`);
				} else {
					if (!this.checkPermissionRole(role)) {
						embed
							.setColor('#ff0000')
							.setTitle('Error')
							.setDescription(`${msg.author}, you don't have permission to add yourself to role(s).`);
					} else {
						await msg.member.roles
							.add(role)
							.then(() =>
								embed
									.setColor('#228522')
									.setTitle('Success!')
									.setDescription(`${msg.author}, you've been added to ${role}!`)
									.setTimestamp()
							)
							.catch(async (error) => {
								console.error(error);

								embed
									.setColor('#ff0000')
									.setTitle('Error')
									.setDescription(`${msg.author}, something went horribly wrong!`);
							});
					}
				}
			} else {
				embed
					.setColor('#ff0000')
					.setTitle('Error')
					.setDescription(
						`${msg.author}, we couldn't find the specified role. Make sure you have typed it correctly!`
					);
			}
			msg.channel.send(embed);
		}
	}
}
