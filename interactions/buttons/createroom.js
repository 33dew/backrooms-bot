const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("create-room")
            .setTitle("Tworzenie strefy")
        const channelName = new TextInputBuilder()
            .setCustomId("create-room-input")
            .setLabel("Nazwa strefy")
            .setStyle(TextInputStyle.Short)
        const firstActionRow = new ActionRowBuilder().addComponents(channelName);
        modal.addComponents(firstActionRow)
        await interaction.showModal(modal)
    }
}