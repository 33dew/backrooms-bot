const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    createRoomComponent: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('createroom')
                        .setLabel('Create!')
                        .setStyle(ButtonStyle.Success),
                )
}