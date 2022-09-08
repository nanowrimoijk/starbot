const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "test",
	description: "",
	usage: "",
	admin: true, 

	execute(client, message, args, Discord) {
		DB.set('auto_mod', 'ban').then(() => {
			console.log('auto_mod key has been created')
		})
	}
}
