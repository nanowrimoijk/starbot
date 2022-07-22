const { Permissions } = require('discord.js');
const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

let mod_role = '712531393787199539'


module.exports = {
	name: "modmail",
	description: "",
	usage: "",
	admin: true,

	execute(client, message, args, Discord) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00')
			.setTitle('Modmail')
			.setDescription(`Hello and thank you for contacting me ${message.author.username}!\nPlease type your reasoning for contacting me and I'll relay it to the moderators of Starbreak's Public server! Or simply type 'cancel' to cancel the interaction.`)
			.setAuthor(client.user.username)//image is next argument
			.setTimestamp()

		message.channel.send(exampleEmbed);

		let filter = m => m.author.id === message.author.id
		message.channel.awaitMessages(filter, {
			max: 1,
			time: 60000,
			errors: ['time']
		}).then(reply => {
			reply = reply.first();

			let server = client.guilds.cache.get('583063339131863040');

			client.guilds.cache.get('583063339131863040').channels.create(`TK-${message.author.username}_${message.author.id}`, {
				type: 'GUILD_TEXT',
				permissionOverwrites: [
					{
						id: server.roles.everyone,
						deny: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: mod_role,//mod role id
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
					},
				],
			}).then(channel => {
				channel.send(`<@&${mod_role}> ${reply}`);
			});

			message.reply('ticket created, please wait for a response before typing more.');



		})
			.then(collected => {
				console.log(collected);
			})
			.catch(error => {
				message.channel.send('Interaction timed out.');
				DB.get(eval(`-${message.author.id}`)).then(user => {
					let object = user;
					user.ticket = false;

					let key = eval(`-${message.author.id}`);
					DB.set(key, object).then(() => {
						//message.channel.send('Interaction timed out, please type anything to create a new interaction.');
					});
				});
			});
	}
}
