const { SlashCommandBuilder } = require('discord.js')
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
            content: 'You dont have room yet',
            ephemeral: true
        })
        let isUserIn = await isUserInRoom(interaction.user.id, interaction.options.getMember("user").id)
        if(!isUserIn) return interaction.reply({
            content: 'This user isn\'t in your room yet',
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
            content: `User <@${interaction.options.getMember("user").id}> had been removed from your room!`,
            ephemeral: true
        });
    }
}