const { ChannelType, PermissionFlagsBits } = require('discord.js')
const { isUserHasRoom, saveRoom } = require('../../db/roomHandler')
const { configureRoomComponent } = require('../../utils/components')
const { configureRoomEmbed } = require('../../utils/embeds')

module.exports = {
    async execute(interaction) {
        let isUser = await isUserHasRoom(interaction.user.id)
        if(isUser) return interaction.reply({
            content: 'Posiadasz już aktywny pokój!',
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
            name: "config",
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                },
            ]
        })
        const c2 = await guild.channels.create({
            name: "general",
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageMessages],
                },
            ]
        })
        const c3 = await guild.channels.create({
            name: "voice",
            type: ChannelType.GuildVoice,
            parent: category,
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MoveMembers, PermissionFlagsBits.MuteMembers],
                },
            ]
        })
        saveRoom(interaction.fields.getTextInputValue('create-room-input'), interaction.user.id, [c1.id, c2.id, c3.id], category.id);
        c1.send({
            embeds: [configureRoomEmbed],
            components: [configureRoomComponent]
        })
        interaction.reply({
            content: `Strefa stworzona <#${c1.id}>`,
            ephemeral: true
        });
    }
}