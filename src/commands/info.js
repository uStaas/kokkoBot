const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
	const embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Info')
		.setDescription('We are currently working our hardest to implement and document features. Come back soon, not!')
		.addFields({ name: 'And then he turned himself into a pickle', value: "funniest thing I've ever seen" })
		.setAuthor(client.user.tag)
		.setThumbnail(process.env.THUMBNAIL)
		.setImage(process.env.INFOIMAGE)
		.setFooter('Thelw na piw nero © 2020')
		.setTimestamp();
	msg.channel.send(embed);
};
