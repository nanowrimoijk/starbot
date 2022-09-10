let prefix = process.env.PREFIX;

module.exports = {
	name: "help",
	description: "Lists the usable commands and what they do.",
	usage: `${prefix}help`,

	execute(client, message, args, Discord) {
		let embed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle("Help")
			.setTimestamp()
		;

		client.commands.forEach(function(command) {
			if(!command.admin && !command.mod){
				embed.addField(`${command.name}`, `${command.usage} => ${command.description}`);
			}
		});

		//message.channel.send(embed);
		message.channel.send({embeds: [embed]}).catch(console.error)
	}
}