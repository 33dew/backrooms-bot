const { SlashCommandBuilder } = require('discord.js')
const { getRoom } = require('../../db/controllers/roomController')
const { isUserHasRoom, isUserInRoom, removeUser } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Remove user from your private room")
        .addUserOption(input =>
            input.setName("user")
            .setDescription('Which user')
            .setRequired(true)
        ),
    async execute(interaction) {
        let isUser = await isUserHasRoom(interaction.user.id)
        if(!isUser) return interaction.reply({
            content: 'Nie posiadasz strefy',
            ephemeral: true
        })
        let isUserIn = await isUserInRoom(interaction.user.id, interaction.options.getMember("user").id)
        if(!isUserIn) return interaction.reply({
            content: 'Użytkownik nie jest w strefie',
            ephemeral: true
        })
        removeUser(interaction.user.id, interaction.options.getMember("user").id)
        const room = await getRoom(interaction.user.id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: false })
        room.chats.forEach(async e => {
            const c = await interaction.guild.channels.cache.get(e)
            c.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: false })
        })
        interaction.reply({
            content: `Użytkownik <@${interaction.options.getMember("user").id}> został usunięty z twojej strefy!`,
            ephemeral: true
        });
    }
}