const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong"),
    async execute(interaction) {
        interaction.reply({
            content: "Pong!",
            emphemeral: true
        });
    }
}