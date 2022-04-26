const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "close_ticket",
	description: "Closes the ticket the command is used inside of.",
	usage: `${prefix}close_ticket (*TO BE USED INSIDE OF TICKET CHANNELS ONLY*)`,
	admin: true,

	execute(client, message, args, Discord) {
		let array = message.channel.name.split('-');
		let id = array[2];

		DB.get(eval(`-${id}`)).then(user => {
			let object = user;
			object.ticket = false;
			DB.set(eval(`-${id}`), object).then(() => {
				message.channel.delete().catch(console.error);
				client.users.cache.get(id).send('ticket closed, thank you for contacting us!');
			});
		});
	}
}
