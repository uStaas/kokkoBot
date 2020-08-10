require('dotenv').config();
const PREFIX = process.env.PREFIX;
const SECRET = process.env.SECRET;
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs').promises;
const path = require('path');

client.commands = new Map();

// Login with our discordsecret
client.login(SECRET);

// When we have inital handshake, log a message to the console
client.on('ready', () => {
	console.log(`Successfully connected as ${client.user.tag} ✅`);
});

// Handle message
client.on('message', (msg) => {
	// Bot sending msg? Ignore
	// If not a bot, check if its our prefix
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	// Split each piece without the prefix
	let cmdMsg = msg.content.substring(msg.content.indexOf(PREFIX) + 1);
	// Then Split to differect args
	let cmdArgs = cmdMsg.split(new RegExp(/\s+/));
	// Isolate command name
	let cmdName = cmdArgs.shift().toLowerCase();

	// Lookup map, if command exists, run and pass client,msg,args instances
	if (client.commands.get(cmdName)) {
		client.commands.get(cmdName).run(client, msg, cmdArgs);
	}
});

(async function registerCommands(dir = 'commands') {
	// Read dir
	let files = await fs.readdir(path.join(__dirname, dir));
	for (let file of files) {
		// Get n-th file
		let stat = await fs.lstat(path.join(__dirname, dir, file));
		// If directory treat it as 'dir/somefile' and traverse
		if (stat.isDirectory()) {
			registerModels(path.join(dir, file));
		} else {
			// If we found a file, check if it's *.js and register its name and module
			// export to a Map
			if (file.endsWith('.js')) {
				let cmdName = file.substring(0, file.indexOf('.js'));
				let cmdModule = require(path.join(__dirname, dir, file));
				client.commands.set(cmdName, cmdModule);
			}
		}
	}
	console.log(`${client.commands.size} commands loaded ✅`);
})();
