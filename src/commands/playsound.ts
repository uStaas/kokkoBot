import * as Discord from 'discord.js';
import * as config from '../config';
import { IBotCommand } from '../util/api';

export default class playsound implements IBotCommand {
	private readonly _command = 'playsound';

	help(): string {
		return 'This command plays a sound.';
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
		let voiceChannel = msg.member.voice.channel;
		voiceChannel
			.join()
			.then((connection: { play: (arg0: string) => any }) => {
				const dispatcher = connection.play(config.sound);
				dispatcher.on('finish', () => {
					voiceChannel.leave();
					dispatcher.destroy();
				});
			})
			.catch((e: any) => console.error(e));
	}
}
