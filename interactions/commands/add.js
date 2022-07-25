const { SlashCommandBuilder } = require('discord.js')
const { addUser, isUserInRoom, collectRoom, isConfigChannel } = require('../../db/roomHandler')

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
        if (!isConfigChannel(interaction.channel.id)) {
            interaction.reply("Nie możesz użyć tej komendy w tym pokoju")
            return
        }
        let isUserIn = await isUserInRoom(interaction.channel.id, interaction.options.getMember("user").id)
        if(isUserIn) return interaction.reply({
            content: 'Użytkownik jest już w twojej strefie',
            ephemeral: true
        })
        const room = await collectRoom(interaction.channel.id)
        if(!room.settings.isConfigured) return interaction.reply({
            content: 'Musisz wybrac szablon zanim dodasz osobe',
            ephemeral: true
        })
        addUser(interaction.channel.id, interaction.options.getMember("user").id)
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