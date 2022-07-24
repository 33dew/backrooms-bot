require('dotenv').config();
const { Client, GatewayIntentBits, Collection, InteractionType } = require('discord.js');
const { getCategory } = require('./db/roomHandler')
const { returnTemplate } = require('./local/template')
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'DiscordBackrooms'
}).then(() => {
  console.log('Connected to Database');
});

client.commands = new Collection()
module.exports.CommandCollection = client.commands
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  require('./commands.js');
});

client.on('interactionCreate', async interaction => {
  if(interaction.type === InteractionType.ModalSubmit) {
    if(interaction.customId === 'create-room') {
      require('./interactions/submits/createroom').execute(interaction)
    } 
  } else if (interaction.isChatInputCommand()){
    const command = client.commands.get(interaction.commandName)
    if(!command) return;
    try {
      await command.execute(interaction)
    } catch(err) {
      if(err) console.error(err)
      await interaction.reply({
        content: 'Coś poszło nie tak!',
        ephemeral: true
      })
    }
  } else if(interaction.isButton()){
    if(fs.existsSync(`./interactions/buttons/${interaction.customId}.js`)){ 
      const button = require(`./interactions/buttons/${interaction.customId}.js`)
      try {
        await button.execute(interaction)
      } catch(err) {
        if(err) console.error(err)
        await interaction.reply({
          content: 'Coś poszło nie tak!',
          ephemeral: true
        })
      }
    }
  } else if(interaction.isSelectMenu()){
    if(interaction.customId === "template"){
      const categoryID = await getCategory(interaction.user.id, interaction.channel.id)
      const template = await returnTemplate(interaction.values[0])
      const categoryChannel = interaction.guild.channels.cache.get(categoryID)
      template[0].text_chats.forEach(async e => {
        await interaction.guild.channels.create({
          name: e,
          type: ChannelType.GuildText,
          parent: categoryChannel,
          permissionOverwrites: [
              {
                  id: interaction.guild.id,
                  deny: [PermissionFlagsBits.ViewChannel],
              },
              {
                  id: interaction.user.id,
                  allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageMessages],
              },
          ]
        })
      })
      template[0].voice_chats.forEach(async e => {
        await interaction.guild.channels.create({
          name: e.name,
          type: ChannelType.GuildVoice,
          userLimit: e.size,
          parent: category,
          permissionOverwrites: [
              {
                  id: interaction.guild.id,
                  deny: [PermissionFlagsBits.ViewChannel],
              },
              {
                  id: interaction.user.id,
                  allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MoveMembers, PermissionFlagsBits.MuteMembers],
              },
          ]
      })
      })

      await interaction.update({
        content: `Ustawiono szablon: \`${interaction.values[0]}\``,
        components: []
      })
    }
  }
});

client.login(process.env.TOKEN);
