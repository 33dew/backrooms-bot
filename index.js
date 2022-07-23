require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
client.commands = new Collection()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  require('./commands.js');
});



client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.name)
  if(!command) return;
  try {
    await command.execute(interaction)
  } catch(err) {
    if(err) console.error(err)
    await interaction.reply({
      content: 'Error wyjebalo',
      emphemeral: true
    })
  }
});

client.login(process.env.TOKEN);
