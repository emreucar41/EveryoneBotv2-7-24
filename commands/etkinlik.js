const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
     var channel = bot.channels.get("545311814783598612");
     if(message.content === "etkinlik") return message.channel.send("asd");


}
module.exports.help = {
    name: "eeemute",
    description: "Mutes A Member İn The Discord!",
    usage: "?mute >@user> >reason>",
    accessableby: "Members",
    noalias: "No Aliases",
    aliases: ["m", "nosepak"]
}