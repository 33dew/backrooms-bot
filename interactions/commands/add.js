const { SlashCommandBuilder } = require('discord.js')
const { addUser, isUserHasRoom, isUserInRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add user to your private room")
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
        if(isUserIn) return interaction.reply({
            content: 'This user is already in your room',
            ephemeral: true
        })
        addUser(interaction.user.id, interaction.options.getMember("user").id)
        const room = await getRoom(interaction.user.id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: true })
        room.chats.forEach(async e => {
            const c = await interaction.guild.channels.cache.get(e)
            c.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: true })
        })
        interaction.reply({
            content: `User <@${interaction.options.getMember("user").id}> has been added to your room!`,
            ephemeral: true
        });
    }
}