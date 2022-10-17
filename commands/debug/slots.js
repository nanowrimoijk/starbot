const Database = require("@replit/database");
const DB = new Database();
let prefix = process.env.PREFIX;

module.exports = {
  name: "slots",
  description: "Roll the slots for absolutely no reason!",
  usage: `${prefix}slots`,
  admin: true, 

  execute(client, message, args, Discord) {
    let result = [];

    let items = [
      { name: 'space_invader', id: 1030612098721525872, value: 0 },
      { name: 'cherries', id: 1030612360576114838, value: 2 },
      { name: 'grapes', id: 1030612387390291998, value: 5 },
      { name: 'tangerine', id: 1030612397607616512, value: 10 },
      { name: 'musical_note', id: 1030612423184498791, value: 20 },
      { name: 'crescent_moon', id: 1030612442457317417, value: 30 },
      { name: 'star2', id: 1030612475604893846, value: 50 },
    ];
    
    try {
      for (let i = 3; i > 0; i--) {
        result.push(items[
          Math.floor(Math.random() * items.length)
        ]);
      }
      
      //<:Starbreak_has_a_neck_1:769043388417966100>

      let score = 0;

      console.log(result);

      result.forEach(function(ele) {
        message.channel.send(`<:${ele.name}:${ele.id}>`);
        score += ele.value;
      });

      message.channel.send(score.toString());
    } catch (error) { console.log(error) }

    //message.channel.send(result.join("\n"));


  }
}
