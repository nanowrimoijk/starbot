const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "kick",
	description: "",
	usage: `${prefix}kick <*@mention*> <*optional:* [*reason>*]`,
	args: true, 

	execute(client, message, args, Discord) {
		let user = message.mentions.users.first();
		let reason = undefined;

		args[1] != undefined ? reason = args[1] : undefined;

		user.kick(reason);
	}
}
