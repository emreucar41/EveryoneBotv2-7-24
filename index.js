const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
let green = botconfig.green;
let cooldown = new Set();
const active = new Map();
let cdseconds = 5;
bot.commands = new Discord.Collection();
require("./util/eventHandler")(bot),



fs.readdir("./commands/", (err, files) => {
  const active = new Map();

  if(err) console.log(err);

 let jsfile = files.filter(f => f.split(".").pop() === "js")
 if(jsfile.length <= 0){
   console.log("Komut Bulunamadı.");
   return;
  }

 jsfile.forEach((f, i) =>{
   let props = require(`./commands/${f}`);
   console.log(`${f} Kullanıma Hazır.`);
   bot.commands.set(props.help.name, props);
  });

});


 bot.on("messageUpdate", async (oldMessage, newMessage) => {

 
 if(oldMessage.content === newMessage.content){
  return;
 }
var logchannel = bot.channels.get("518770219418779658");
let logembed = new Discord.RichEmbed()
.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
.setThumbnail(oldMessage.author.avatarURL)
.setColor("RED")
.setDescription("Message Edited")
.addField("Before Message", oldMessage.content, true)
.addField("After", newMessage.content, true)
.setTimestamp()
logchannel.send(logembed)
})

bot.on("messageDelete", async message => {
  var logchannel = bot.channels.get("518770219418779658");

  let logembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .setColor("RED")
  .setDescription(":wastebasket: Message Deleted")
  .addField("Message", message.content, true)
  .setTimestamp()
  logchannel.send(logembed)
})
 


bot.on("message", async message => {
   if(message.author.bot) return;
   if(message.channel.type === "dm") return;

   let ops = {
    ownerID: "471590154927210497",
    active: active
  }
  
   
   if (message.content.toLowerCase === 'ping') {
    message.channel.send('Pong!');
  }

   let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

   if(!prefixes[message.guild.id]){
     prefixes[message.guild.id] = {
       prefixes: botconfig.prefix
     };
   }
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);


   let prefix = prefixes[message.guild.id].prefixes;
   if(!message.content.startsWith(prefix)) return;
   if(cooldown.has(message.author.id)){
     message.delete();
     return message.reply("Please Wait 3 Seconds.")
   }
   if(!message.member.roles.some(r=>["🖲CODER🖲"].includes(r.name))) return message.channel.send("No.")
   if(message.member.roles.some(r=>["🖲CODER🖲"].includes(r.name))){
   if(message.content === `${prefix}etkinlik`){

    let etk = args.slice(1).join(" ")

    var channel = bot.channels.get("545311814783598612");
        let embed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription("Etkinlik", message.author.avatarURL)
        .addField("** :bear: Etkinlik Başlasın :bear: **", "İlk {*kazandım} Yazan Kişi //Etkinlik// Rolünü Kapar Hızlı Ol.")
        message.channel.send(embed)     
      }else {
        if(message.content === `${prefix}kazandım`)
             message.reply(" :zap: Dur./ " + message.author.username + " Kazandı İlk Yazan Kişi Olduğu İçin //Etkinlik// Rolünün Sahibi Oldu. :zap: ");
       }
    }
       // if(!message.member.hasPermission("ADMINISTRATOR")){
     cooldown.add(message.author.id);
   // }
   let commandfile = bot.commands.get(cmd.slice(prefix.length));
   if(commandfile) {
    if(cmd === `${prefix}play` || (cmd === `${prefix}queue`) || (cmd === `${prefix}skip`) || (cmd === `${prefix}resume`) || (cmd === `${prefix}pause`) || (cmd === `${prefix}volume`) || (cmd === `${prefix}search`) ) {
    commandfile.run(bot, message,args, ops);
    }else {
    commandfile.run(bot,message,args)
    }
    }



   setTimeout(() => {
     cooldown.delete(message.author.id)
   }, cdseconds * 100)

});

bot.login(botconfig.token);
