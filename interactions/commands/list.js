const { SlashCommandBuilder } = require('discord.js')
const { collectRoom, isConfigChannel } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("list")
        .setDescription("Lista osób w pokoju"),
    async execute(interaction) {
        let _isConfigChannel = await isConfigChannel(interaction.message.channel.id);
        if (!_isConfigChannel) {
            interaction.reply("Nie możesz użyć tej komendy w tym pokoju")
            return
        }
        const room = await collectRoom(interaction.channel.id)
        const users = room.users.map(user => `> <@${user}>`)
        interaction.reply({
            content: users.length > 0 ? users.join('\n') : "Nikt nie posiada dostępu",
            ephemeral: true
        });
    }
}