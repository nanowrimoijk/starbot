const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "auto_mod",
	description: "Switch wether a user will be banned or kicked when they get 3 strikes.",
	usage: `${prefix}auto_mod <*optional:* [*B/K*]>`,
	admin: true,

	execute(client, message, args, Discord) {
		DB.get('auto_mod').then(value => {
			if (args[0] == undefined) {
				message.reply(`auto mod is currently set to '${value}'`);
				
			}
			else if(args[0] == 'B' || args[0] == 'K'){
				let AM = args[0] == 'B' ? 'ban' : 'kick';
				DB.set('auto_mod', AM).then(() => {
					message.reply(`auto mod has been set to '${AM}'`);
				});
			}
		});
	}
}
