const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;
let log_channel = process.env.MOD_LOG;
let max_strikes = 3;

module.exports = {
	name: "strike",
	description: `Gives the specified user a strike, 3 strikes and it will automatically ban or kick them.`,
	usage: `${prefix}strike <*@mention*> <*optional:* [*reason*>]`,
	args: true,
	mod: true,

	execute(client, message, args, Discord) {
		let auto_mod;

		DB.get('auto_mod').then(value => {
			auto_mod = value;
		});

		let user_id = message.mentions.users.first().id;
		let user = message.guild.members.cache.get(user_id);
		let length = 2; //months roughly

		let channel = message.guild.channels.cache.get(log_channel);

		let reason = undefined;
		args.shift();
		args.shift();
		args = args.join(' ');

		if (args.split('')[0] != undefined && args.split('')[0] != ' ') {
			reason = args;
		}
		else {
			reason = "no reason given";
		}


		try {
			DB.get(eval(`-${user.id}`)).then(u => {
				let new_user = u;
				new_user.strikes += 1;

				DB.set(eval(`-${user.id}`), new_user).then(() => {
					//message.channel.send(`${new_user.strikes}/${max_strikes}`);

					//message.reply(`${user} was striked for: ${reason}.`);

					let striked_at = new Date().addHours(-5);
					let revoked_at = new Date().addHours(24 * 30 * length);

					channel.send(`Offender: ${user}
Type: Strike ${new_user.strikes}/${max_strikes}
Reason: ${reason}
Issued: ${striked_at.getMonth()}/${striked_at.getDay()} (EST)
Minimum Revocation Date: ${revoked_at.getMonth()}/${revoked_at.getDay()} (EST)
Status: active`);

					if (new_user.strikes >= 3 && auto_mod == 'ban') {// if they have too many strikes, ban them
						let banned_at = new Date().addHours(-5);
						let revoked_at = new Date().addHours(24 * 30 * length);

						DB.get('bans').then(bans => {
							let new_bans = bans;
							let u = {
								id: user.id,
								reason: reason,
								issued: banned_at,
								revoked: revoked_at
							}
							new_bans.push(u);
						});

						channel.send('_ _');
						channel.send(`Offender: ${user}
Type: Ban
Reason: Too many strikes
Issued: ${banned_at.getMonth()}/${banned_at.getDay()} (EST)
Minimum Revocation Date: ${length > 0 ? revoked_at.getMonth() : 'N/A'}${length > 0 ? '/' : ''}${length > 0 ? revoked_at.getDay() : ''} (EST)
Status: active`);

						user.ban({ reason: reason });
					}
					else if (new_user.strikes >= 3 && auto_mod == 'kick') {
						//user.kick(reason);

						let kicked_at = new Date().addHours(-5);

						channel.send('_ _');
						channel.send(`Offender: ${user}
Type: Kick
Reason: ${reason}
Issued: ${kicked_at.getMonth()}/${kicked_at.getDay()} EST`);
					}
				});
			});
		} catch (err) {
			message.reply(`could not strike user '${user}/${user.id}' for some reason.`);
			console.log(err);
		}
	}
}




Date.prototype.addHours = function(h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
}