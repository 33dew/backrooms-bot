const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')
const { registerRoom } = require('../db/roomActions')
const Room = require('../db/models/room')
module.exports = {
    data:  new SlashCommandBuilder()
        .setName("test")
        .setDescription("tescik")
        .addStringOption(option => 
            option.setName("teststring")
                .setDescription("Podaj tekst")
                .setRequired(true)
                .setMinLength(3)
        ),
    async execute(interaction) {
        const category = await interaction.guild.channels.create({
            name: interaction.user.id,
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                }]
        })
        interaction.guild.channels.create({
            name: "Ogólny",
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                }]
        })
        // registerRoom(new Room({
        //     name: interaction.options.getString("teststring"),
        //     owner: interaction.user.id,
        //     users: [],
        //     chats: ['123', '321', '132']
        // }))
        interaction.reply({
            content: `Test ${interaction.options.getString("teststring")}`,
            ephemeral: true
        });
    }
}