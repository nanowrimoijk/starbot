const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
  name: "del_level",
  description: "Delete a role from being given by level.",
  usage: `${prefix}del_level <@*role name*>`,
  args: true,
  admin: true,

  execute(client, message, args, Discord) {
    let role = message.mentions.roles.first();

    DB.get(`*${message.guild.id}`).then(server => {
      let new_server = server;
      
      let find_role = new_server.level_roles.find(el => el.id == role.id);
      if(find_role != undefined){
        let new_levels = [];
        new_server.level_roles.forEach(ele => {
          if(ele.id != role.id){
            new_levels.push(ele);
          }
        });
        new_server.level_roles = new_levels;

        DB.set(`*${message.guild.id}`, new_server).then(() => {
          message.reply(`The role '${role.name}' will no longer be given to users.`);
        });
      }
    });
  }
}
