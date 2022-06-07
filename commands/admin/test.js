const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "test",
	description: "",
	usage: "",
	admin: true, 

	execute(client, message, args, Discord) {
		DB.set('bans', []).then(() => {
			console.log('bans key has been created')
		})
	}
}
