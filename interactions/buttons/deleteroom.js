const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } = require("discord.js");
const { getRoom, archiveRoom } = require('../../db/roomHandler')
module.exports = {
    async execute(interaction) {
        const room = await getRoom(interaction.user.id)
        await archiveRoom(interaction.user.id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.user, { ViewChannel: false })
        room.chat.forEach(e => {
            const c = await interaction.guild.channels.cache.get(e)
            console.log(c)
            c.permissionOverwrites.edit(interaction.user, { ViewChannel: false })
        })
    }
}