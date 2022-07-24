const { SlashCommandBuilder } = require('discord.js')
const { isUserHasRoom, isUserInRoom, removeUser } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Remove user from your private room")
        .addMentionableOption(input =>
            input.setName("user")
            .setDescription('Which user')
            .setRequired(true)
        ),
    async execute(interaction) {
        let isUser = await isUserHasRoom(interaction.user.id)
        if(!isUser) return interaction.reply({
            content: 'You dont have room yet',
            ephemeral: true
        })
        if(!isUserInRoom(interaction.user.id, interaction.option.getMentionable("user"))) return interaction.reply({
            content: 'This user isn\'t in your room yet',
            ephemeral: true
        })
        removeUser(interaction.user.id, interaction.option.getMentionable("user"))
        interaction.reply({
            content: `User <@${interaction.option.getMentionable("user")}> remove from your room!`,
            ephemeral: true
        });
    }
}