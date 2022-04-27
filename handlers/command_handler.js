const fs = require('fs');

module.exports = (client, Discord) => {
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    const load_dir = (dirs) => {    
        const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of command_files) {
            const command = require(`../commands/${dirs}/${file}`);
            console.log(`[COMMAND HANDLER] ${file} found!`);
            //reads for files, logs what files were found. if your file isnt listed. you messed up somewhere!
            if(command.name) {
                client.commands.set(command.name, command);
            }
            else {
                continue;
            }
        }
    }

    ['debug', 'general', 'admin', 'mod'].forEach(e => load_dir(e));
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    // to load more command directories, please add more to this array: 
    // Ex) if you want to put commands in a folder called "fun", you would add 'fun' to the array making it ['debug', 'fun'].....

    //easy editable
}