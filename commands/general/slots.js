const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "slots",
	description: "Roll the slots for absolutely no reason!",
	usage: `${prefix}slots`,

	execute(client, message, args, Discord) {
		let result = [];
		
		let items = [
			{name: 'space_invader', value: 0}, 
			{name: 'cherries', value: 2}, 
			{name: 'grapes', value: 5}, 
			{name: 'tangerine', value: 10}, 
			{name: 'musical_note', value: 20}, 
			{name: 'cresent_moon', value: 30}, 
			{name: 'star2', value: 50}, 
		];

		for(let i = 3; i > 0; i--){
			result.push(items[  
	      Math.floor(Math.random() * items.length)
	    ]);
		}

		message.channel.send(result);

		
	}
}
