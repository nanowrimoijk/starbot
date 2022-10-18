const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
  name: "add_level",
  description: "Add a role to be given by level.",
  usage: `${prefix}add_level <@*role name*> <level>`,
  args: true,
  admin: true,

  execute(client, message, args, Discord) {
    if (args[1] != undefined) {
      let role = message.mentions.roles.first();

      DB.get(`*${message.guild.id}`).then(server => {
        let new_server = server;
        new_server.level_roles.push({ id: role.id, level: args[1] });

        DB.set(`*${message.guild.id}`, new_server).then(() => {
          message.reply(`The role '${role.name}' will now be given to users who reach level ${args[1]}.`);
        });
      });
    }
    else{
      message.reply('you need to specify both a role and a level!');
    }
  }
}
