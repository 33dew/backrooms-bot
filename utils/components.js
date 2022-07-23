const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    createRoomComponent: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('createroom')
                        .setLabel('Create!')
                        .setStyle(ButtonStyle.Success),
                ),
    configureRoomComponent: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('addfriend')
                        .setLabel('Add friend!')
                        .setStyle(ButtonStyle.Primary),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('removefriend')
                        .setLabel('Remove friend!')
                        .setStyle(ButtonStyle.Danger),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('deleteroom')
                        .setLabel('Delete section!')
                        .setStyle(ButtonStyle.Danger),
                ),
}