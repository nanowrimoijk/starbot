const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "c",
	description: "Used in order to talk in tickets.",
	usage: `${prefix}c <*message*>`,
	mod: true,

	execute(client, message, args, Discord) {
		let array = message.channel.name.split('_');
		let id = array[array.length - 1].toString();

		try {
			client.users.cache.get(id).send(`>${args.join(' ')}`);
		} catch (err) { console.log(err) }
	}
}
