const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"))
const commands = [];

for (const file of commandFiles){
  const command = require(`./command/${file}`)
  commands.push(command.data.toJSON())
  client.commands.set(command.data.name, command)
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.S_ONE, process.env.S_TWO), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);