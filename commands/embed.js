const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sending an embed")
        .addStringOption(option => 
            option.setName("category")
            .setDescription('The embed category')
            .setRequired(true)
            .addChoices(
                { name: 'Create room', value: 'create_room' }
            )),
    async execute(interaction) {

        interaction.reply({
            content: "Test!",
            ephemeral: true
        });
    }
}