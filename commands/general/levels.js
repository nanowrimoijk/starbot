const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

module.exports = {
	name: "levels",
	description: "Shows the global leaderboard.",
	usage: `${prefix}levels <*optional*: [*page number*]>`,

	async execute(client, message, args, Discord) {

		let first_message = await message.channel.send('please wait...');

		/*
		DB.list("-").then(keys => {
			let playerList = [];
			let total = keys.length;
			let count = 0;

			keys.forEach(function(ele) {
				DB.get(eval(ele)).then(value => {
					let x = {
						name: value.name, 
						level: value.level, 
						total_exp: get_total_exp(value), 
					}
					playerList.push(x);
				}).then(() => {
					count++;
					if (count == total) {
						playerList = playerList.sort((a, b) => (a.total_exp - b.total_exp));
						playerList.reverse();
						//message.channel.send(playerList.join("\n"));
						//console.log(playerList);

						let array = [`new Discord.MessageEmbed()`, `.setColor('#00')`, `.setTitle("Leaderboard")`, `.setTimestamp()`];

						let count = 1;
						let startAt = 1;

						if(args[0] != undefined){
							if(!numbers.includes(args[0])){
								message.reply(`this command requires either a **Number** as an argument, or nothing at all.`);
								return;
							}
							else{
								startAt = args[0];
							}
						}
						
						playerList.forEach(function(ele){
							//console.log(count);
							if(count >= ((startAt - 1) * 10 ) + 1 && count <= startAt * 10){
								array.push(`.addField('${count}. ${ele.name}', 'lv.${ele.level} exp:${ele.total_exp}')`);
							}
							else if(count > startAt * 10){
								return;
							}

							count++;
						});

						array = array.join('');
						let embed = eval(array);

						let index = playerList.map(e => e.name).indexOf(message.author.username);
						//console.log(index + 1);
						embed.setFooter({ text: `${message.author.username}, you are rank ${index + 1}`});

						//message.channel.send(embed);
						//message.channel.send({embeds: [embed]}).catch(console.error)
						first_message.edit({content: '_ _', embeds: [embed]}).catch(console.error);
					}
				});
			});
		});
    */




    DB.get(`*${message.guild.id}`).then(server => {
      let db_list = server.users;

      let playerList = [];
			let total = db_list.length;
			let count = 0;

      db_list.forEach(ele => {
        let x = {
          name: ele.name, 
          level: ele.level,  
          total_exp: get_total_exp(ele), 
        }
        playerList.push(x);

        //then

        count++;

        if (count == total) {
						playerList = playerList.sort((a, b) => (a.total_exp - b.total_exp));
						playerList.reverse();
						//message.channel.send(playerList.join("\n"));
						//console.log(playerList);

						let array = [`new Discord.MessageEmbed()`, `.setColor('#00')`, `.setTitle("Leaderboard")`, `.setTimestamp()`];

						let count = 1;
						let startAt = 1;

						if(args[0] != undefined){
							if(!numbers.includes(args[0])){
								message.reply(`this command requires either a **Number** as an argument, or nothing at all.`);
								return;
							}
							else{
								startAt = args[0];
							}
						}

						/*
						console.log(count);
						console.log(startAt);
						console.log(((startAt - 1) * 10 ) + 1);
						console.log(startAt * 10);
						console.log();
						*/
						
						playerList.forEach(function(ele){
							//console.log(count);
							if(count >= ((startAt - 1) * 10 ) + 1 && count <= startAt * 10){
								array.push(`.addField('${count}. ${ele.name}', 'lv.${ele.level} total exp:${ele.total_exp}')`);
							}
							else if(count > startAt * 10){
								return;
							}

							count++;
						});

						array = array.join('');
						let embed = eval(array);

						let index = playerList.map(e => e.name).indexOf(message.author.username);
						//console.log(index + 1);
						embed.setFooter({ text: `${message.author.username}, you are rank ${index + 1}`});

						//message.channel.send(embed);
						//message.channel.send({embeds: [embed]}).catch(console.error)
						first_message.edit({content: '_ _', embeds: [embed]}).catch(console.error);
					}
        
        
      });
      
    });
	}
}


function get_total_exp(object){
	let level = object.level;
	let exp = object.exp;
	let total = 0;

	total += parseInt(exp);
	for(let i = level - 1; i > 0; i--){
		total += i * 100;
	}

	//console.log(total);
	return total;
}