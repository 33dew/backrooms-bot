const { SlashCommandBuilder } = require('discord.js')
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
        registerRoom(new Room({
            name: interaction.options.getString("teststring"),
            owner: interaction.user.id,
            users: [],
            chats: ['123', '321', '132']
        }))
        interaction.reply({
            content: `Test ${interaction.options.getString("teststring")}`,
            ephemeral: true
        });
    }
}