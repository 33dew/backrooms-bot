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
        let _isConfigChannel = await isConfigChannel(interaction.channel.id, interaction.guild.id);
        if (!_isConfigChannel) {
            return interaction.reply({
                content: "Nie możesz użyć tej komendy w tym pokoju",
                ephemeral: true
            })
        }
        let isUserIn = await isUserInRoom(interaction.channel.id, interaction.options.getMember("user").id, interaction.guild.id)
        if(isUserIn) return interaction.reply({
            content: 'Użytkownik jest już w twojej strefie',
            ephemeral: true
        })
        const room = await collectRoom(interaction.channel.id, interaction.guild.id)
        if(!room.settings.isConfigured) return interaction.reply({
            content: 'Musisz wybrac szablon zanim dodasz osobe',
            ephemeral: true
        })
        addUser(interaction.channel.id, interaction.options.getMember("user").id, interaction.guild.id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: true })
        room.chats.forEach(async (e, i) => {
            const c = await interaction.guild.channels.cache.get(e.channelid)
            c.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: i > 0 ? true : false })
        })
        interaction.reply({
            content: `Użytkownik <@${interaction.options.getMember("user").id}> został dodany do twojej strefy!`,
            ephemeral: true
        });
    }
}