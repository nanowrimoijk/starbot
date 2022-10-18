const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
  name: "give_exp",
  description: "Gives a given ammount of experience to a user.",
  usage: `${prefix}give_exp <*@mention*> <*exp ammount*>`,
  args: true,
  admin: true,

  execute(client, message, args, Discord) {
    if (args[1] && parseInt(args[1]) != NaN) {
      let id = message.mentions.users.first().id;

      /*
      DB.get(eval(`-${id}`)).then(user => {
        console.log(user);
        console.log(user.exp);
        new_user = {
          name: user.name,
          last_exp: user.last_exp,
          level: user.level,
          exp: user.exp + parseInt(args[1]),
        }
        console.log(new_user.exp);
        DB.set(eval(`-${id}`), new_user).then(() => {
          console.log(new_user);
        });
      });
      */




      DB.get(`*${message.guild.id}`).then(server => {
        let user = server.users.find(el => el.id == id);

        let new_user = user;
        new_user.exp += parseInt(args[1]);

        let new_user_array = [];
        server.users.forEach(ele => {
          if (ele.id != user.id) {
            new_user_array.push(ele);
          }
        });
        new_user_array.push(new_user);

        let new_server = server;
        new_server.users = new_user_array;

        DB.set(`*${message.guild.id}`, new_server).then(() => {
          message.reply(`User '${new_user.name}' was given ${args[1]} experience.`);
        });

      });


      
    }
    else {
      message.reply("you need to specify user, and an exp amount!");
    }
  }
}
