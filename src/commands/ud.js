const Discord = require('discord.js');
const ud = require('urban-dictionary');

module.exports.run = async (client, msg, args) => {
	let embed = new Discord.MessageEmbed();
	ud.term(args.join(' '), (error, entries, tags, sounds) => {
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
};
