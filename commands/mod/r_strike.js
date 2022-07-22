const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "r_strike",
	description: "Removes a strike from a specified user.",
	usage: `${prefix}r_strike <*@mention*>`,
	args: true, 
	mod: true, 

	execute(client, message, args, Discord) {
		let user = message.mentions.users.first();
		let new_user;

		DB.get(eval(`-${user.id}`)).then(u => {
			new_user = u;
			u.strikes -= 1;
			DB.set(eval(`-${user.id}`), new_user).then(() => {
				message.reply(`removed a strike from ${user}`);
			});
		});
	}
}
