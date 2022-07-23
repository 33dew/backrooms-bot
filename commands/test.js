const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("test")
        .setDescription("tescik")
        .addStringOption(option => 
            option.setName("teststring")
                .setDescription("Podaj tekst")
                .setRequired(true)
                .setMinLength(3)
        ),
    async execute(interaction) {
        interaction.reply({
            content: `Test ${interaction.options.getString("teststring")}`,
            ephemeral: true
        });
    }
}