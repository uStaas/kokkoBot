import { enabledCommands } from './enabledCommands';
import { IBotCommand } from './api';

export default function loadCommands(commandsPath: string): IBotCommand[] {
	let commands: IBotCommand[] = [];
	if (!enabledCommands || (enabledCommands as string[]).length === 0) return;
	for (const commandName of enabledCommands) {
		const commandClass = require(`${commandsPath}/${commandName}`).default;
		const command = new commandClass() as IBotCommand;
		commands.push(command);
	}
	console.log(`${commands.length} commands loaded! ✅`);
	return commands
}
