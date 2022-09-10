let prefix = process.env.PREFIX;


module.exports = {
    name: "neck",
    description: "starbreak neck ;)",
		usage: `${prefix}neck`, 
    execute(client, message, args, Discord) {
			message.channel.send("<:Starbreak_has_a_neck_1:769043388417966100>\n<:Starbreak_has_a_neck_2:769043449654804510>\n<:Starbreak_has_a_neck_2:769043449654804510>\n<:Starbreak_has_a_neck_2:769043449654804510>");
    }
}