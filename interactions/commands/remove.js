const { SlashCommandBuilder } = require('discord.js')
const { isConfigChannel, isUserInRoom, removeUser, collectRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Usuń użytkownika z pokoju")
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
        if(!isUserIn) return interaction.reply({
            content: 'Użytkownik nie jest w strefie',
            ephemeral: true
        })
        const room = await collectRoom(interaction.channel.id, interaction.guild.id)
        if(!room.settings.isConfigured) return interaction.reply({
            content: 'Musisz wybrac szablon zanim usuniesz osobe',
            ephemeral: true
        })
        removeUser(interaction.channel.id, interaction.options.getMember("user").id, interaction.guild.id)
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