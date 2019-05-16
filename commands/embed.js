const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args, filter) => {
    
    if (message.content === `${prefix}embed`){
 message.reply("Please Use <*embed 'text'>. ")
 var satır2 = message.guild.id
    var satır3 = message.author.username
let embed = new Discord.RichEmbed()
.setDescription("Örnek Embed")
.setThumbnail(message.author.avatarURL)
.setColor("RED")
.addField("**Embed Yapımcısı**", satır3)
.addField("**Embed Yazısı**", "<'text'>")
.addField("**Embed Yapımcısının ID'si**", satır2)
message.channel.send(embed)
    }
    
    var satır1 = args.join(" ").slice(0);
    var satır2 = message.guild.id
    var satır3 = message.author.username
    let embed = new Discord.RichEmbed()
    .setDescription("Embed")
    .setThumbnail(message.author.avatarURL)
    .setColor("RED")
    .addField("**Embed Yapımcısı**", satır3)
    .addField("**Embed Yazısı**", satır1)
    .addField("**Embed Yapımcısının ID'si**", satır2)
    message.channel.send(embed)
    
} 

module.exports.help = {
    name: "embed",
    aliases: ["h", "halp", "commands"],
    usage: "?usage",
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"
}