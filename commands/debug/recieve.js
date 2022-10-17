const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "r",
	description: "",
	usage: ``,
  admin: true, 

	execute(client, message, args, Discord) {
	
		let user_data = message.content.split('|}{');
		user_data[0] = user_data[0].split(/!r /)[1];
	
		//console.log(user_data);

		let user_object = {
			name: user_data[1], 
			last_exp: user_data[2], 
			level: user_data[3], 
			exp: user_data[4], 
			ticket: user_data[5], 
			strikes: user_data[6], 
			warns: user_data[7]
		}

		console.log(user_object);

		DB.set(user_data[0], user_object).then(() => {
			client.channels.cache.get('1017898277636689961').send(`%t`);
		});
		
	}
}
