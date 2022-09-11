const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "lvl",
	description: "subtracts the level of a user",
	usage: `${prefix}ml <*@mention*> <*level ammount*>`,
	args: true,
	admin: true,

	execute(client, message, args, Discord) {
		if (args[1] && parseInt(args[1]) != NaN) {
			let id = message.mentions.users.first().id;
			DB.get(eval(`-${id}`)).then(user => {
				console.log(user);
				console.log(user.level);
				new_user = {
					name: user.name,
					last_exp: user.last_exp,
					level: parseInt(args[1]),
					exp: user.exp,
				}
				console.log(new_user.level);
				DB.set(eval(`-${id}`), new_user).then(() => {
					console.log(new_user);
				});
			});
		}
		else{
			message.reply("you need to specify user, and a level amount!");
		}
	}
}
