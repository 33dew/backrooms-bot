const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken("MTAwMDE4ODI4Mjg0MTM1MDE0NA.Gzxnfy.TP_61e1CZHVWolRrQyBYPWYTpY-OomWq-mD4Es");

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);