const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "test",
	description: "",
	usage: "",
	admin: true, 

	execute(client, message, args, Discord) {
		let user = message.mentions.members.first();
		console.log(message.member._roles);
		//message.channel.send(message.mentions.members.first().username);
	}
}
