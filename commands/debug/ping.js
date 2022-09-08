let prefix = process.env.PREFIX;

module.exports = {
	name: 'ping',
	description: "Returns the bot\'s ping.",
	usage: 	`${prefix}ping`,
	
	execute(client, message, args, Discord) {
		message.channel.send('Finding ping...').then(resultMessage => {
			const ping = resultMessage.createdTimestamp - message.createdTimestamp;

			message.channel.send(`Bot Latency: ${ping}ms, API Latency: ${client.ws.ping}ms`);
		});
	},
};

// Ping command, displays Bot Latency and API Latency.
// Personally I put console.logs in here to test universal values like message.member and see what they return