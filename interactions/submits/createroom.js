const { ChannelType, PermissionFlagsBits } = require('discord.js')
const { registerRoom } = require('../../db/roomActions')
const Room = require('../../db/models/room')
module.exports = {
    async execute(interaction) {
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
        registerRoom(new Room({
            name: interaction.fields.getTextInputValue('create-room-input'),
            owner: interaction.user.id,
            users: [],
            chats: [c1.id, c2.id, c3.id]
        }))
        interaction.reply({
            content: `Rooms created <#${c2.id}>`,
            ephemeral: true
        });
    }
}