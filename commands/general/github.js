const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "github",
	description: "Links the code for the bot.",
	usage: `${prefix}github`,

	execute(client, message, args, Discord) {
		message.reply("you can find the code at: \nhttps://github.com\/nanowrimoijk\/starbot")
	}
}
