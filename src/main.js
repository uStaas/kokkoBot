require('dotenv').config();
const PREFIX = process.env.PREFIX;
const SECRET = process.env.SECRET;
const Discord = require('discord.js');
const client = new Discord.Client();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

// Login with our discordsecret
client.login(SECRET);

// When we have inital handshake, log a message to the console
client.on('ready', () => {
	console.log(`Successfully connected as ${client.user.tag}`);
});

const isValidCommand = (msg, cmdName) => {
	msg.content.toLowerCase().startsWith(PREFIX + cmdName);
};

// Handle message
client.on('message', (msg) => {
	// Bot sending msg? Ignore
	if (msg.author.bot) {
		return;
		// If not a bot, check if its our prefix
	} else if (isValidCommand(msg)) {
		msg.reply('gyrna sto terma sou paidaki');
	}
});
