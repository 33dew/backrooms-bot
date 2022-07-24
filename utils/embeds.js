const { EmbedBuilder } = require("discord.js");

module.exports = {
    createRoomEmbed: new EmbedBuilder()
        .setColor(0x2D7D46)
        .setTitle('Tworzenie strefy')
        .setDescription('Kliknij guzik poniżej, aby stworzyć prywatną strefę!')
        .setFooter({ text: '• Backrooms'})
        .setTimestamp(),
    configureRoomEmbed: new EmbedBuilder()
        .setColor(0x0066FF)
        .setTitle('Konfiguracja')
        .setDescription('Tutaj możesz zmienić konfigurację dla twojej strefy\n\n> **/add <user>** - dodawanie użytkownika do strefy\n> **/remove <user>** - usunięcie użytkownika z strefy\n> **/list** - lista osób, które mają dostęp do strefy')
        .setFooter({ text: '• Backrooms'})
        .setTimestamp()
}