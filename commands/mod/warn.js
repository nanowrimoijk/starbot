/*
const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;
let log_channel = process.env.MOD_LOG;

module.exports = {
	name: "warn",
	description: "",
	usage: `${prefix}warn <*@mention*> <*length(in months(will not be exact), defaults to 1)*> <*optional:* [*reason>*]`,
	args: true,
	admin: true,

	execute(client, message, args, Discord) {
		let user = message.mentions.users.first();
		let user_id = message.guild.members.cache.get(user.id)

		let channel = message.guild.channels.cache.get(log_channel);

		let reason = undefined;
		args.shift();
		args = args.join(' ');

		if (args.split('')[0] != undefined && args.split('')[0] != ' ') {
			reason = args;
		}
		else {
			reason = "no reason given";
		}

		if (length <= 0) {
			length = 1;
		}


		try {
			message.reply(`${user} was warned for: ${reason}.`);

			let warned_at = new Date().addHours(-5);
			let revoked_at = new Date().addHours(24 * 30 * length);

			DB.get(eval(`-${message.author.id}`)).then(user => {
				let object = user;
				object.warns = undefined ? object.warns = 1 : object.warns += 1
				DB.set(eval(`-${message.author.id}`), object).then(() => {
					if (object.warns < 3) {
						console.log(`warned ${user} (${object.warns}/3)`);

						channel.send(`Offender: ${user}
Type: warn()
Reason: ${reason}
Issued: ${warned_at.getMonth()}/${warned_at.getDay()} EST
Minimum Revocation Date: ${revoked_at.getMonth()}/${revoked_at.getDay()}
Status: active`);
					}

				});
			} catch (err) {
				message.reply(`could not warn user '${user}/${user.id}' for some reason.`);
				console.log(err);
			}
		}
}
}
*/



Date.prototype.addHours = function(h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
}