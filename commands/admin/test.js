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
		let id = user.id;
		
		DB.get(eval(`-${id}`)).then(user => {
			let object = user;
			object.ticket = false;
			DB.set(eval(`-${id}`), object).then(() => {
				//message.channel.delete().catch(console.error);
				client.users.cache.get(id).send('ticket closed, thank you for contacting us!');
			});
		});
		//message.channel.send(message.mentions.members.first().username);
	}
}
