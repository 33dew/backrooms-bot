const { ChannelType, PermissionFlagsBits } = require('discord.js')
const { howManyRoomsActiveRoom, makeRoom } = require('../../db/roomHandler')
const { configureRoomTemplate } = require('../../utils/components')
const { configureRoomEmbed } = require('../../utils/embeds')

module.exports = {
    async execute(interaction) {
        let ActiveRoomCount = await howManyRoomsActiveRoom();
        if(ActiveRoomCount >= 3) return interaction.reply({
            content: 'Posiadasz już 3 aktywne pokoje!',
            ephemeral: true
        })
        const guild = interaction.guild
        const category = await guild.channels.create({
            name: interaction.fields.getTextInputValue('create-room-input'),
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                }]
        })
        const role = guild.roles.cache.find(r => r.name === "@everyone");
        const c1 = await guild.channels.create({
            name: "konfiguracja",
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel]
                },
            ]
        })
        makeRoom(interaction.fields.getTextInputValue('create-room-input'), interaction.user.id, [c1.id], category.id)
        c1.send({
            embeds: [configureRoomEmbed],
            components: [configureRoomTemplate]
        })
        interaction.reply({
            content: `Strefa stworzona <#${c1.id}>`,
            ephemeral: true
        });
    }
}