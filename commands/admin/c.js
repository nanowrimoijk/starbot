const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "c",
	description: "Used when talking in tickets.",
	usage: `${prefix}c <*message*>`,
	admin: true,

	execute(client, message, args, Discord) {
		let array = message.channel.name.split('-');
		let id = array[2];

		try {
			client.users.cache.get(id).send(`>${args.join(' ')}`);
		} catch (err) { console.log(error) }
	}
}
