const { collectRoom, removeRoom } = require('../../db/roomHandler')
module.exports = {
    async execute(interaction) {
        interaction.reply({
            content: 'Usuwanie rozpoczete!'
        })
        const room = await collectRoom(interaction.channel.id, interaction.guild.id)
        room.chats.forEach(async e => {
            const c = await interaction.guild.channels.cache.get(e.channelid)
            c.delete()
        })
        const category = await interaction.guild.channels.cache.get(room.category)
        category.delete()
        removeRoom(interaction.channel.id, interaction.guild.id)
    }
}