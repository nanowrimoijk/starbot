const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
  name: "delete",
  description: "Deletes the server from the bot database.",
  usage: `${prefix}delete`,
  admin: true,

  execute(client, message, args, Discord) {
    let guild = message.guild;
    
    DB.delete(`*${guild.id}`).then(() => {
      message.channel.send('deleted');
    });
  }
}
