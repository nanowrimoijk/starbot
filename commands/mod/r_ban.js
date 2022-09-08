const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

let guild_id = 826624049999249491;

module.exports = {
	name: "r_ban",
	description: "Revoke a ban.",
	usage: `${prefix}r_ban <*user id*>`,
	mod: true, 
	args: true, 

	execute(client, message, args, Discord) {
		let user = args[0];
		let new_bans = [];

		DB.get('bans').then(bans => {
			bans.forEach(value => {
				if(value.id != user){
					new_bans.push(value);
				}
			});
			DB.set('bans', new_bans).then(() => {
				//client.guilds.cache.get(guild_id).bans.remove(user);
				message.guild.members.unban(user).catch(console.error);
				message.reply(`unbanned user ${user}`);
			});
		});
	}
}
