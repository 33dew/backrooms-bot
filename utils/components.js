const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    createRoomComponent: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('createroom')
                        .setLabel('Stwórz!')
                        .setStyle(ButtonStyle.Success),
                ),
    configureRoomComponent: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('deleteroom')
                        .setLabel('Usuń strefę!')
                        .setStyle(ButtonStyle.Danger),
                ),
}