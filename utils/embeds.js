const { EmbedBuilder } = require("discord.js");

module.exports = {
    createRoomEmbed: new EmbedBuilder()
        .setColor(0x2D7D46)
        .setTitle('Create room')
        .setDescription('Click button below to create a private rooms section on our server!')
        .setFooter({ text: '• Backrooms'})
        .setTimestamp(),
    configureRoomEmbed: new EmbedBuilder()
        .setColor(0x0066FF)
        .setTitle('Configuration')
        .setDescription('Here you can change configuration for your room\n\n> **/add <user>** - will add someone to your section\n> **/remove <user>** - will remove someone from your section')
        .setFooter({ text: '• Backrooms'})
        .setTimestamp()
}