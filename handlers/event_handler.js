const fs = require('fs');

module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const events_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
        
        for(const file of events_files) {
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
            console.log("[EVENT HANDLER] "+event_name+".js found!");
            //reads for files, logs what files were found. if your file isnt listed. you messed up somewhere!
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e));
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("Events and Commands Loaded!");

		

    // loads client and guild events

    //easy editable, but you dont really need to mess with this one as much
} 
