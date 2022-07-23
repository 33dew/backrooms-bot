module.exports = {
    createRoomComponent: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('create_room')
                        .setLabel('Create!')
                        .setStyle(ButtonStyle.Success),
                )
}