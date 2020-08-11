const Discord = require('discord.js');
const commando = require('discord.js-commando');
const bot = new commando.Client();
const PREFIX = "$";
const randomPuppy = require('random-puppy');


function generateHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};

var fortunes = [
    "Yes",
    "No",
    "Maybe"
];

bot.on("ready", function() {
    console.log("Bot is online");
});

bot.on('message', (message) => {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.send(":ping_pong: Pong! :ping_pong:");
            break;

        case "bot":
            message.channel.send({embed: {
                color: 0x00ff00,
                description: "HamBot created by Hamzah Sarmad"}});
            break;

        case "hello":
            message.channel.send(":wave: Hi there :wave:");
            break;

        case "cookie":
            message.channel.send("Here's a cookie :cookie:");
            break;

        case "magicconch":
            var embed = new Discord.RichEmbed()
                .addField("The magic conch says: ", fortunes[Math.floor(Math.random() * fortunes.length)])
                .setThumbnail("https://www.shodor.org/~alexc/pics/MagicConch.png")
            message.channel.send(embed);
            break;

        case "info":
            let user = message.mentions.users.first();
            if (user.presence.status == "online") {
                var embed = new Discord.RichEmbed()
                    .setColor("0x00ff00")
                    .setTitle(user.tag)
                    .addField("User ID: ", user.id)
                    .addField("Status: ", user.presence.status)
                    .setThumbnail(user.avatarURL)
                message.channel.send(embed);
                break;
            } else if (user.presence.status == "offline") {
                var embed = new Discord.RichEmbed()
                    .setColor("0xff0000")
                    .setTitle(user.tag)
                    .addField("User ID: ", user.id)
                    .addField("Status: ", user.presence.status)
                    .setThumbnail(user.avatarURL)
                message.channel.send(embed);
                break;
            }
        
        case "puppy":
            randomPuppy()
                .then(url => {
                    message.channel.send(url);
                });
            break;
            
        case "roll":
            var roll = Math.floor(Math.random() * 100) + 1;
            message.reply("You rolled a " + roll);
            break;
        
        default:
            message.channel.send({embed:"Invalid Command!"});
            break;
    };

});

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();

bot.login('TOKEN');
