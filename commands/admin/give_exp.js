const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "give_exp",
	description: "Gives a given ammount of experience to a user.",
	usage: `${prefix}give_exp <*@mention*> <*exp ammount*>`,
	args: true,
	admin: true,

	execute(client, message, args, Discord) {
		if (args[1] && parseInt(args[1]) != NaN) {
			let id = message.mentions.users.first().id;
			DB.get(eval(`-${id}`)).then(user => {
				console.log(user);
				console.log(user.exp);
				new_user = {
					name: user.name,
					last_exp: user.last_exp,
					level: user.level,
					exp: user.exp + parseInt(args[1]),
				}
				console.log(new_user.exp);
				DB.set(eval(`-${id}`), new_user).then(() => {
					console.log(new_user);
				});
			});
		}
		else{
			message.reply("you need to specify user, and an exp amount!");
		}
	}
}
