const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
  name: "add_server",
  description: "Adds the server to the bot database.",
  usage: `${prefix}addServer`,
  admin: true,

  execute(client, message, args, Discord) {
    let guild = message.guild;
    
    guild_object = {
      id: guild.id,
      name: guild.name,
      users: [], //log user data 
      mod_id: '',
      admin_id: '', 
      prefix: '',
      level_channel: '',
      level_roles: [], 
    }

    DB.set(`*${guild.id}`, guild_object).then(() => {
      message.channel.send(`bot was added to ${guild.name}`);
    });
  }
}
