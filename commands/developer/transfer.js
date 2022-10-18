const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "transfer",
	description: "",
	usage: "",
  admin: true, 

	execute(client, message, args, Discord) {
    
	  DB.list('-').then(keys => {
      let new_array = [];
      
      keys.forEach(user => {
        DB.get(user).then(value => {
          let new_value = value;
          new_value.id = user.split('-')[1];
          //new_value.id = user.join('');
          new_array.push(new_value);
          console.log(new_value);
          console.log();
        });
      });

      DB.get(`*${message.guild.id}`).then(value => {
        let new_guild = value;
        new_guild.users = new_array;

        DB.set(`*${message.guild.id}`, new_guild).then(() => {
          message.reply('proccess completed');
          console.log(new_array);
        });
      });
      
    });
	}
}
