const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;
let log_channel = process.env.MOD_LOG;

module.exports = {
	name: "ban",
	description: "",
	usage: `${prefix}strike <*@mention*> <*optional:* [*reason>*]`,
	args: true, 
	admin: true, 

	execute(client, message, args, Discord) {
		let user = message.mentions.users.first();
		let user_id = message.guild.members.cache.get(user.id)
		let length = 2

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
			message.reply(`${user} was striked for: ${reason}.`);

			let striked_at = new Date().addHours(-5);
			let revoked_at = new Date().addHours(24 * 30 * length);

			channel.send(`Offender: ${user}
Type: strike
Reason: ${reason}
Issued: ${striked_at.getMonth()}/${striked_at.getDay()} EST
Minimum Revocation Date: ${revoked_at.getMonth()}/${revoked_at.getDay()}
Status: active`)
		}catch(err){
			message.reply(`could not strike user '${user}/${user.id}' for some reason.`);
			console.log(err);
		}
	}
}




Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}