import * as Discord from 'discord.js';
import { IBotCommand } from '../util/api';
import * as config from '../config';
import commands from '../index';
import { handleCommand } from '../util';

export default class help implements IBotCommand {
    private readonly _command = 'help';

    help(): string {
        return 'This command lists types/info of commands.';
    }

    usage(): string {
        return `Usage: ${config.PREFIX + this._command} [command]`;
    }

    nsfw(): boolean {
        return false;
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    run(args: string[], msg: Discord.Message, client: Discord.Client): void {
        const embed = new Discord.MessageEmbed();
        if (args.toString().length === 0) {
            embed.setColor('#0099ff')
                .setTitle(`💻 Commands`)
                .setThumbnail(msg.guild.owner.user.avatarURL())
                .setImage(client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thelw na piw nero © 2020', client.user.avatarURL());
            commands.forEach(element => {
                embed.addFields({ name: `${element._command} / ${element.usage()}`, value: `${element.help()}` })
            });
        } else {
            let command: IBotCommand;
            for (command of commands) {
                if (command.isThisCommand(args[0])) {
                    embed.setColor('#0099ff')
                        .setTitle(`💻 Command ${args[0]}`)
                        .setThumbnail(msg.guild.owner.user.avatarURL())
                        .setImage(client.user.avatarURL())
                        .setTimestamp()
                        .setFooter('Thelw na piw nero © 2020', client.user.avatarURL())
                        .addFields({ name: `${command._command}`, value: `${command.help()}` },
                            { name: `🔞NSFW: ${command.nsfw()} `, value: `\u200B` },
                            { name: `${command.usage()}`, value: `\u200B` });
                    break;
                }
            }
            if (!command.isThisCommand(args[0])) {
                embed.setColor('#ff0000')
                    .setTitle(`You have to specify a valid command!`)
                    .setImage(client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thelw na piw nero © 2020', client.user.avatarURL())
                    .addFields({ name: `Do ${config.PREFIX}help for a list of available commands.`, value: `\u200B` });
            }
        }
        msg.channel.send(embed);
    }
}


