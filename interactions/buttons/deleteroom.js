const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const { getRoom, updateRoom } = require('../../db/roomHandler')
module.exports = {
    async execute(interaction) {
        const room = await getRoom(interaction.user.id)
        room.settings = {...room.settings, isArchived: true}
        console.log(room)
        await interaction.reply({
            content: 'test'
        })
    }
}