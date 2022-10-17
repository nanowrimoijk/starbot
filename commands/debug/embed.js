const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "embed",
	description: "",
	usage: "",
  admin: true, 

	execute(client, message, args, Discord) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle('Commands')
			.setAuthor('Help')//image is next argument
			.addField('search <tag>', 'Search the database for items tagged with <tag>')
			.setTimestamp()

		//message.channel.send(exampleEmbed);
		message.channel.send({embeds: [exampleEmbed]}).catch(console.error)
	}
}
