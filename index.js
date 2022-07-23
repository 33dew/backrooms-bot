require('dotenv').config();
require('./db/dbconn');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection()
module.exports.CommandCollection = client.commands
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  require('./commands.js');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName)
  if(!command) return;
  try {
    await command.execute(interaction)
  } catch(err) {
    if(err) console.error(err)
    await interaction.reply({
      content: 'Smth went wrong!',
      ephemeral: true
    })
  }
});

client.login(process.env.TOKEN);