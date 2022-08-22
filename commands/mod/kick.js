const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;
let log_channel = process.env.MOD_LOG;

module.exports = {
	name: "kick",
	description: "",
	usage: `${prefix}kick <*@mention*> <*optional:* [*reason>*]`,
	args: true, 
	mod: true, 

	execute(client, message, args, Discord) {
		let user_id = message.mentions.users.first().id;
		let user = message.guild.members.cache.get(user_id);

		let channel = message.guild.channels.cache.get(log_channel);
		
		let reason = undefined;
		args.shift();
		args = args.join(' ');

		args != undefined ? reason = args : undefined;
		

		try{
			//message.reply(`${user} was kicked for: ${reason}.`);
			user.kick(reason);

			let kicked_at = new Date().addHours(-5);

			channel.send(`Offender: ${user}
Type: kick
Reason: ${reason}
Issued: ${kicked_at.getMonth()}/${kicked_at.getDay()} EST`);
		}catch(err){
			comsole.log(err);
			message.reply(`could not kick user '${user}/${user_id}' for some reason.`)
		}
	}
}
