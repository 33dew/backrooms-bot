const { collectRoom, archiveRoom } = require('../../db/roomHandler')
const { deleteChannelsComponent } = require('../../utils/components')
module.exports = {
    async execute(interaction) {
        const room = await collectRoom(interaction.channel.id, interaction.guild.id)
        archiveRoom(`${interaction.channel.id}`, interaction.guild.id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.user, { ViewChannel: false })
        room.chats.forEach(async e => {
            const c = await interaction.guild.channels.cache.get(e)
            c.permissionOverwrites.edit(interaction.user, { ViewChannel: false })
        })
        room.users.forEach(async userid => {
            const user = interaction.guild.members.cache.get(userid)
            channel.permissionOverwrites.edit(user, { ViewChannel: false })
            room.chats.forEach(async e => {
                const c = await interaction.guild.channels.cache.get(e)
                c.permissionOverwrites.edit(user, { ViewChannel: false })
            })
        })
        interaction.reply({
            content: "Section archived"
        })
        interaction.channel.send({
            components: [deleteChannelsComponent]
        })
    }
}