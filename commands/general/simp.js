let prefix = process.env.PREFIX;


module.exports = {
    name: "simp",
    description: "wheel of simp",
		usage: `${prefix}simp`, 
    execute(client, message, args, Discord) {
        let listy = ['You are not a simp.','You are a simp, but not for Void','You are a raging simpy bottom','You simp for Star','You simp for Void *and* Star','Moderate simp']
        let result = listy[  
          Math.floor(Math.random() * listy.length)
        ]
        message.reply(result);
    }
}