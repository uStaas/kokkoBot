const Discord = require('discord.js');
const checkPermissionRole = (role) => {
	role.permissions.has('ADMINISTRATOR') ||
		role.permissions.has('KICK_MEMBERS') ||
		role.permissions.has('BAN_MEMBERS') ||
		role.permissions.has('MANAGE_GUILD') ||
		role.permissions.has('MANAGE_CHANNELS');
};

module.exports.run = async (client, msg, args) => {
	let { cache } = msg.guild.roles;
	let role = cache.find((role) => role.name.toLowerCase() === args[0].toLowerCase());
	let embed = new Discord.MessageEmbed();
	if (role) {
		if (msg.member.roles.cache.has(role.id)) {
			embed.setColor('#ff0000').setTitle('Error').setDescription(`${msg.author}, you are already in that group!`);
		} else {
			if (!checkPermissionRole(role)) {
				embed
					.setColor('#ff0000')
					.setTitle('Error')
					.setDescription(`${msg.author}, you don't have permission to add yourself to that group.`);
			} else {
				msg.member.roles
					.add(role)
					.then((embed, msg) => {
						embed
							.setColor('#228522')
							.setTitle('Roll')
							.setDescription(`${msg.author}, you've been added to ${role}!`)
							.setTimestamp();
					})
					.catch((error) => {
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
};
