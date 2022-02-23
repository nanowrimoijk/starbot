const Database = require("@replit/database");
const DB = new Database();

let exp_range = 19; //+1
let level_increase = 100;

module.exports = (Discord, client, message) => {

	//console.log(`${message} - ${message.author.username}#${message.author.discriminator}`);
	// logs all user and bot sent messages, if you do not want this, put // before the line

	let role_levels = ['Satellite', 'Meteor', 'Rising Star', 'Shooting Star', 'Nebula', 'Supernova', 'Supernova', 'Supernova'];


	if (!message.author.bot) {
		DB.get(eval(`-${message.author.id}`)).then(user => {
			if (user == null) {
				let key = eval(`-${message.author.id}`);
				DB.set(key, {
					name: message.author.username,
					last_exp: message.createdAt.getTime(),
					level: 1,
					exp: Random(exp_range),
				}).then(() => {
					console.log(`DB: key for user '${message.author.username}/${message.author.id}' has been added`);
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
						new_user.level += 1;
						client.channels.cache.get('585978730816733217').send(`${message.author} you are now level ${new_user.level}!`);
					}

					let remainder = new_user.level % 5;
					//console.log(new_user.level);
					//console.log(remainder);
					let number = Math.floor((new_user.level - remainder) / 5);
					//console.log(number);
					let possible_role = message.guild.roles.cache.find((r) => r.name === role_levels[number]);

					if (!message.member._roles.includes(possible_role.id)) {
						message.member.roles.add(possible_role);
						//client.channels.cache.get('933531708165345393').send(`${message.author} has been given the role "${possible_role.name}"`);
						client.users.cache.get('510193628245786656').send(`${message.author.username}#${message.author.discriminator}, ${lowRole.name}, ${message.url}`);
					}

					DB.set(eval(`-${message.author.id}`), new_user).then(() => {
						//console.log(`updated user ${message.author.username}`);
						return;
					});
				}
			}
		});
	}

	const prefix = process.env.PREFIX;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command = client.commands.get(cmd);

	if (!command) return;

	if ((command.admin && !message.member.hasPermission('ADMINISTRATOR') && message.author.id != 510193628245786656)) {
		//let mod_role = message.guild.roles.cache.find((r) => r.name === "Starcop (Mod)");
		return message.channel.send(`You don't have permission to use this command, ${message.author}!`);
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