const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("create-room")
            .setTitle("Creating room")
        const channelName = new TextInputBuilder()
            .setCustomId("create-room-input")
            .setLabel("Room's name")
            .setStyle(TextInputStyle.Short)
        const firstActionRow = new ActionRowBuilder().addComponents(channelName);
        modal.addComponents(firstActionRow)
        await interaction.showModal(modal)
    }
}