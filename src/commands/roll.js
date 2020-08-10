const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
	let randomNumber = Math.floor(Math.random() * args[0]) + 1;
	let embed = new Discord.MessageEmbed();
	if (!(Array.isArray(args) && args.length) || !parseInt(args[0]) || parseInt(args[0]) <= 1) {
		embed
			.setColor('#ff0000')
			.setTitle('Error')
			.setDescription(`${msg.author}, you have to specify a number >1 to roll from!`);
	} else {
		embed
			.setColor('#228522')
			.setTitle('Roll')
			.setDescription(`${msg.author} rolled ${randomNumber} out of ${args[0]}!`)
			.setTimestamp();
	}

	msg.channel.send(embed);
};
