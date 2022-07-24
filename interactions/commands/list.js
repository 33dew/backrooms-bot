const { SlashCommandBuilder } = require('discord.js')
const { getRoom } = require('../../db/controllers/roomController')
const { isUserHasRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("list")
        .setDescription("Lista osób w pokoju"),
    async execute(interaction) {
        let isUser = await isUserHasRoom(interaction.user.id)
        if(!isUser) return interaction.reply({
            content: 'Nie posiadasz strefy',
            ephemeral: true
        })
        const room = await getRoom(interaction.user.id)
        const users = room.users.map(user => `> <@${user}>`)
        interaction.reply({
            content: users.length > 0 ? users.join('\n') : "Nikt nie posiada dostępu",
            ephemeral: true
        });
    }
}