module.exports = {
    name: 'ping',
    description: "This is a ping command!",
    execute(message, args){
        message.channel.send('Tao là Bot, Ping con cặc!');
    }
}
