const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args, filter) => {
    
    message.channel
        .awaitMessages(filter, { max: 1, time: 10 * 1000 })
        .then(collected => {
            if (collected.first()) {
                let userReply = collected.first();
                if (isNaN(userReply.content))
                    return message.channel.send("Lütfen Bir Yazı Giriniz.");
                let userChoice = Number(userReply.content);
                let chosenLyrics = bot.lyrics.get(lyricList[userChoice]);
                listMessage.delete();
                listMessage = undefined;
                message.channel.send(`Successfully chosen ${chosenLyrics.help.formattedName}.`);
                let timeoutCounter = 5000;
                let splitLyrics = chosenLyrics.lyrics;
                splitLyrics.split('\n').forEach(word => {
                    setTimeout(() => {
                        changeActivity(bot, 'PLAYING', word, true);
                    }, timeoutCounter);
                    timeoutCounter += 5000;
                });
                setTimeout(() => {
                    randomActivity(bot);
                }, timeoutCounter);
            } else return message.channel.send("User didn't reply in 10 seconds. Canceling.");
        })
        .catch(err => console.log(err));
 }


module.exports.help = {
        name: "lyr",
        aliases: ["h", "halp", "commands"],
        usage: "?usage",
        description: "",
        noalias: "No Aliases",
        accessableby: "Members"
    }