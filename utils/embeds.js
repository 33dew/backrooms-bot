const { EmbedBuilder } = require("discord.js");

module.exports = {
    createRoomEmbed: new EmbedBuilder()
        .setColor(0x2D7D46)
        .setTitle('Create room')
        .setDescription('Click button below to create a private rooms section on our server!')
        .setFooter({ text: '• Backrooms'})
        .setTimestamp()
}