const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } = require("discord.js");
const { getRoom, updateRoom } = require('../../db/roomHandler')
module.exports = {
    async execute(interaction) {
        const room = await getRoom(interaction.user.id)
        updateRoom(interaction.user.id, {
            settings: {
                isArchived: true
            }
        })
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.overwritePermissions({
            id: interaction.user.id,
            deny: [PermissionFlagsBits.ViewChannel]
        })
        for(const chat in room.chats){
            const c = await interaction.guild.channels.cache.get(chat)
            c.overwritePermissions({
                id: interaction.user.id,
                deny: [PermissionFlagsBits.ViewChannel]
            })
        }
    }
}