
const Database = require("@replit/database");
const DB = new Database();

let exp_range = 19; //+1
let level_increase = 100;

let check_server_CACHE = [];

module.exports = (Discord, client, message) => {

  let role_levels = ['Satellite', 'Meteor', 'Rising Star', 'Shooting Star', 'Nebula', 'Supernova'];

  if (!message.author.bot && message.guild != null) {
    DB.get(eval(`-${message.author.id}`)).then(user => {
      if (user == null) {// check if user is new to the bot
        let key = eval(`-${message.author.id}`);
        DB.set(key, {
          name: message.author.username,
          last_exp: message.createdAt.getTime(),
          level: 1,
          exp: Random(exp_range),
          ticket: false,
          strikes: 0,
          warns: 0,
        }).then(() => {
          console.log(`DB: key for user '${message.author.username}#${message.author.discriminator}(${message.author.id})' has been added`);
        });
      }
      else {
        let then = user.last_exp;
        let now = new Date().getTime();

        let diffTime = Math.abs(now - then);
        let diffDays = Math.round(diffTime / (1000 * 60 * 1));

        if (diffDays >= 1) {
          let new_user = user;

          new_user.exp += Random(exp_range) + 1;
          new_user.last_exp = message.createdAt.getTime();
          new_user.name = message.author.username;

          if (new_user.exp >= (new_user.level * level_increase)) {
            console.log(new_user);
            new_user.exp -= (new_user.level * level_increase);
            new_user.level = parseInt(new_user.level) + 1;
            try {
              console.log('somebody leveled up');
              //client.channels.cache.get('983591485008134184').send(`${message.author} you are now level ${new_user.level}!`);
            } catch (err) {
              client.users.cache.get('843262807100751902').send(`${message.url}- level up error: ${err}`);
            }
          }

          let remainder = new_user.level % 5;
          //console.log(new_user.level);
          //console.log(remainder);
          let number = Math.floor((new_user.level - remainder) / 5);
          //console.log(number);
          let possible_role
          if (number <= role_levels.length) {
            possible_role = message.guild.roles.cache.find((r) => r.name === role_levels[number]);
          }


          if (possible_role && !message.member._roles.includes(possible_role.id)) {
            //message.member.roles.add(possible_role);

            //client.channels.cache.get('933531708165345393').send(`${message.author} has been given the role "${possible_role.name}"`);
            //client.users.cache.get('510193628245786656').send(`${message.author.username}#${message.author.discriminator}, ${possible_role.name}, ${message.url}`);
          }

          DB.set(eval(`-${message.author.id}`), new_user).then(() => {
            //console.log(`updated user ${message.author.username}`);
            return;
          });
        }
      }
    });

    if (!check_server_CACHE.includes(message.author.id)) {
      DB.get(`*${message.guild.id}`).then(server => {
        console.log(server.name);
        if (!server.users.includes(message.author.id)) {// if user is NOT in the server memory, add them
          let new_server = server;
          new_server.users.push(message.author.id);
          console.log(`added user ${message.author.id} to server ${message.guild.id}`);

        }
      });
      
      check_server_CACHE.push(message.author.id); //cache user
    }
  }


  if (message.mentions.users.has(client.user.id) && message.content.includes('girlfriend')) {
    message.channel.send('<@710851827066732555> my beloved');//710851827066732555
  }

  const prefix = process.env.PREFIX;
  if ((!message.content.startsWith(prefix) && message.guild != null) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (message.guild == null) {
    DB.get(eval(`-${message.author.id}`)).then(user => {
      console.log(user.ticket);
      if (user != null) {
        if (!user.ticket) {
          let object = user;
          user.ticket = false;

          let key = eval(`-${message.author.id}`);
          DB.set(key, object).then(() => {
            console.log(`[MODMAIL]: user '${message.author.username}' account updated`);
            activate_ticket(message.author.id);
          });
        }
        else if (user.ticket == false) {
          activate_ticket(message.author.id);
        }
        else if (user.ticket == true) {
          //console.log(`tk-${message.author.username}-${message.author.id}`)
          if (message.content != 'cancel') {
            let channel = client.channels.cache.find(channel => channel.name === `tk-${message.author.username.toLowerCase()}_${message.author.id}`);
            try {
              channel.send(`>${message}`);
            } catch (err) { console.log(err) }
          }
          else {
            DB.get(eval(`-${message.author.id}`)).then(user => {
              let new_user = user;
              new_user.ticket = false;
              DB.set(eval(`-${message.author.id}`), new_user).then(() => {
                message.reply('ticket creation canceled.');
              });
            });
          }
        }
      }
    });
  }

  function activate_ticket(user) {
    DB.get(eval(`-${user}`)).then(user => {
      let object = user;
      user.ticket = true;

      let key = eval(`-${message.author.id}`);
      DB.set(key, object).then(() => {
        console.log(`[MODMAIL]: user ${message.author.username} created a ticket`);
        client.commands.get('modmail').execute(client, message, args, Discord);
      });
    });
  }

  //if (message.guild == null) cmd = 'modmail';
  const command = client.commands.get(cmd);

  if (!command) return;

  if (message.guild != null) {
    if ((command.admin && message.author.id != process.env.ADMIN)) {
      //let mod_role = message.guild.roles.cache.find((r) => r.name === "Starcop (Mod)");
      return message.channel.send(`You don't have permission to use this command, ${message.author}!`);
    }

    if (command.mod && !message.member._roles.includes('712531393787199539')) {

    }
  }

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  try {
    command.execute(client, message, args, Discord);
  } catch (error) {
    console.log(error);
    message.reply('there was an error trying to execute that command!');
  }
}




function Random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}