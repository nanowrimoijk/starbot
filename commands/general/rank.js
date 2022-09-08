const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
	name: "rank",
	description: "Shows the stats of a user.",
	usage: `${prefix}rank <*optional:* [*@mention*]>`, 

	execute(client, message, args, Discord) {
		let target;
		if (!message.mentions.users.size) {
			target = message.author;
		}
		else {
			const rankList = message.mentions.users.map(user => {
				return user;
			});
			target = rankList[0];
		}

		DB.get(eval(`-${target.id}`)).then(user => {
			const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#00')
				.setTitle(`${target.username}#${target.discriminator}`)
				.setTimestamp()
				//.setAuthor('Help')
				.addField(`level: ${user.level}`, "\u200b")
				.addField(`exp: ${user.exp}/${user.level * 100}`, "\u200b")

			message.channel.send(exampleEmbed);
		});
	}
}
