let prefix = process.env.PREFIX;


module.exports = {
    name: "simp",
    description: "wheel of simp",
		usage: `${prefix}simp`, 
    execute(client, message, args, Discord) {
        const listy = ['You are not a simp.','You are a simp, but not for Void','You are a raging simpy bottom','You simp for Star','You simp for Void *and* Star','Moderate simp']
        const result = listy[  
          Math.floor(Math.random() * greetings.length)
        ]
        message.reply(greeting);
    }
}