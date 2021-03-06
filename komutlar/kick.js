const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
    if(message.channel.type == "dm")  return;
    if(message.channel.type !== "text") return;
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You're not have enough authority!");
    let reason = args.slice(1).join(' ')
    if (!args[0]) return message.reply("Please, tag the user you want to kick.")
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user

    if (!user) return message.reply(`I couldn't find the user you tagged on the server.`)
    let member = message.guild.member(user)
    if (!member) return message.reply(`I couldn't find the user you tagged on the server.`)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.reply(`I not have enough authority.`)
    if (!reason) reason = 'Reason, not specified.'

    message.channel.send(`${user.tag}, To kick this user from the server \`yes\` or \`no\` you need to specify their words.`)
    let uwu = false;
    while (!uwu) {
      const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 30000 });
      const choice = response.first().content
      if (choice == 'no' || choice == 'No') return message.channel.send('Transaction canceled.')
      if (choice !== 'yes' && choice !== 'Yes') {
      }
    if (choice == 'yes' || choice == 'Yes') uwu = true
  }
  if (uwu) {
  try {
  await message.guild.member(user).kick(reason + ` | Authorized: ${message.author.tag} - ${message.author.id}`)
  
  message.channel.send(`**${user.tag}**, kicked from **${message.guild.name}**. `)
  user.send(`You have been kicked from **${message.guild.name}** \n*Reason:* \`\`\`${reason}\`\`\``)

  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${user.username} has been kicked!`, user.avatarURL||user.defaultAvatarURL)
  .addField('Discarded user;', `${user.tag}-[${user.id}]`, true)
  .addField('Assigned authority', `${message.author.tag}-[${message.author.id}]`, true)
  .addField('The reason for being thrown;', reason, true);
   let membermodChannel = await db.fetch(`membermodChannel_${message.guild.id}`)
    if (!message.guild.channels.get(membermodChannel)) return
    else message.guild.channels.get(membermodChannel).send(embed)
  } catch(e) {
    message.channel.send('There is an error.')
  }
  } else return console.log('There is an error.')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kicked'],
  permLevel: 0,
  category: 'Moderation'
  
};

exports.help = {
  name: 'kick',
  description: 'Kick the specified contact from the server.',
  usage: 'b!kick <@user> <reason>'
};
