const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;
let log_channel = process.env.MOD_LOG;

module.exports = {
	name: "ban",
	description: "",
	usage: `${prefix}ban <*@mention*> <*length(in months(will not be exact), or 0 for permanent)*> <*optional:* [*reason>*]`,
	args: true, 
	admin: true, 

	execute(client, message, args, Discord) {
		let user_id = message.mentions.users.first().id;
		let user = message.guild.members.cache.get(user_id)
		let length = args[1];

		let channel = message.guild.channels.cache.get(log_channel);
		
		let reason = undefined;
		args.shift();
		args.shift();
		args = args.join(' ');

		if(args.split('')[0] != undefined && args.split('')[0] != ' '){
			reason = args;
		}
		else{
			reason = "no reason given";
		}
		

		try{
			//message.reply(`${user} was banned for: ${reason}.`);
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
				DB.set('bans', new_bans).then(() => {
					console.log(`banned ${user}`);
				});
			});
			

			channel.send(`Offender: ${user}
Type: Ban
Reason: ${reason}
Issued: ${banned_at.getMonth()}/${banned_at.getDay()} (EST)
Minimum Revocation Date: ${length > 0 ? revoked_at.getMonth(): 'N/A'}${length > 0 ? '/' : ''}${length > 0 ? revoked_at.getDay(): ''} (EST)
Status: active`);

			user.ban({reason: reason});
		}catch(err){
			message.reply(`could not ban user '${user}/${user.id}' for some reason.`);
			console.log(err);
		}
	}
}




Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}