const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "",
	description: "",
	usage: `${prefix}`,
  admin: true, 

	execute(client, message, args, Discord) {
		//
	}
}
