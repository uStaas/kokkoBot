const Discord = require('discord.js');
const { memeAsync } = require('memejs');

let reddits = [ 'memes', 'dankmemes', 'meirl', 'me_irl', 'dankmeme', 'MemeEconomy' ];
module.exports.run = async (client, msg, args) => {
	let subreddit = reddits[Math.floor(Math.random() * reddits.length - 1)];

	memeAsync(subreddit)
		.then((data) => {
			const embed = new Discord.MessageEmbed()
				.setTitle(data.title)
				.setDescription('r/' + data.subreddit)
				.setColor('#ffff00')
				.setImage(data.url)
				.setFooter(`Author: https://reddit.com/u/${data.author}`);
			msg.channel.send(embed);
		})
		.catch((e) => console.error(e));
};
