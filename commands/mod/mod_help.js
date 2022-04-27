let prefix = process.env.PREFIX;

module.exports = {
	name: "mod_help",
	description: "Lists the usable mod commands and what they do.",
	usage: `${prefix}help`,
	mod: true, 

	execute(client, message, args, Discord) {
		let embed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle("Help")
			.setTimestamp()
		;

		client.commands.forEach(function(command) {
			if(!command.admin ){
				embed.addField(`${command.name}`, `${command.usage} => ${command.description}`);
			}
		});

		message.channel.send(embed);
	}
}