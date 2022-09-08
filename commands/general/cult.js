const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "cult-advice",
	description: "Provides advice for dealing with cults.",
	usage: `${prefix}cult-advice`,

	execute(client, message, args, Discord) {
		message.reply("JOIN THE HOBOPHOBIC CULT NOW!")
	}
}
