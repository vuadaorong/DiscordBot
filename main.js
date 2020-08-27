const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

const ytdl = require("ytdl-core");

const { Server } = require('http');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('NoChym is online!');
});

client.on('message' , message =>{

    message.member.roles.cache.has
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command == 'youtube'){
        client.commands.get('youtube').execute(message, args);
    }

    /*Phần bot nhạc */

    switch (args[0]) {
        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.send("Bạn cần cung cấp link cho bot!");
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.send("Bạn phải ở trong voice room để play bot!");
                return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            })
        break;
    }
});


client.login(process.env.token);
