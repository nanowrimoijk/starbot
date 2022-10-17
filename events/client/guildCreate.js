const Database = require("@replit/database");
const DB = new Database();

module.exports = (Discord, client, guild) => {

  guild_object = {
    id: guild.id, 
    name: guild.name, 
    users: [], //log user id for easy access for leaderboard, etc.
    mod_id: '', 
    prefix: '', 
    level_channel: '', 
  }

  DB.set(`*${guild.id}`, guild_object).then(() => {
    console.log(`bot was added to ${guild.name}`);
  });

}