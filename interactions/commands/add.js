const { SlashCommandBuilder } = require('discord.js')
const { addUser, isUserHasRoom, isUserInRoom, getRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("add")
        .setDescription("Dodaj osobę do swojego pokoju")
        .addUserOption(input =>
            input.setName("user")
            .setDescription('Kogo?')
            .setRequired(true)
        ),
    async execute(interaction) {
        let isUser = await isUserHasRoom(interaction.user.id)
        if(!isUser) return interaction.reply({
            content: 'Nie posiadasz strefy',
            ephemeral: true
        })
        let isUserIn = await isUserInRoom(interaction.user.id, interaction.options.getMember("user").id)
        if(isUserIn) return interaction.reply({
            content: 'Użytkownik jest już w twojej strefie',
            ephemeral: true
        })
        const room = await getRoom(interaction.user.id)
        if(!room.settings.isConfigured) return interaction.reply({
            content: 'Musisz wybrac szablon zanim dodasz osobe',
            ephemeral: true
        })
        addUser(interaction.user.id, interaction.options.getMember("user").id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: true })
        room.chats.forEach(async (e, i) => {
            const c = await interaction.guild.channels.cache.get(e)
            c.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: i > 0 ? true : false })
        })
        interaction.reply({
            content: `Użytkownik <@${interaction.options.getMember("user").id}> został dodany do twojej strefy!`,
            ephemeral: true
        });
    }
}