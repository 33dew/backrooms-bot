const { ChannelType, PermissionFlagsBits } = require('discord.js')
const { isUserHasRoom, saveRoom } = require('../../db/roomHandler')

module.exports = {
    async execute(interaction) {
        if(isUserHasRoom(interaction.user.id)) return interaction.reply({
            content: 'You have already room'
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
            name: "Konfiguracja",
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
            name: "Ogólny",
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
        const c3 = await guild.channels.create({
            name: "Voice",
            type: ChannelType.GuildVoice,
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
        saveRoom(interaction.fields.getTextInputValue('create-room-input'), interaction.user.id, [c1.id, c2.id, c3.id]);
        interaction.reply({
            content: `Rooms created <#${c2.id}>`,
            ephemeral: true
        });
    }
}