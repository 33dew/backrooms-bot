const { SlashCommandBuilder } = require('discord.js')
const { getRoom } = require('../../db/controllers/roomController')
const { isUserHasRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("list")
        .setDescription("List of users who have access to your section"),
    async execute(interaction) {
        let isUser = await isUserHasRoom(interaction.user.id)
        if(!isUser) return interaction.reply({
            content: 'You dont have room yet',
            ephemeral: true
        })
        const room = await getRoom(interaction.user.id)
        const users = room.users.map(user => `> <@${user}>`)
        interaction.reply({
            content: users.join('\n'),
            ephemeral: true
        });
    }
}