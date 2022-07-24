const { SlashCommandBuilder } = require('discord.js')
const { addUser, isUserHasRoom, isUserInRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add user to your private room")
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
        if(isUserInRoom(interaction.user.id, interaction.option.getMentionable("user"))) return interaction.reply({
            content: 'This user is already in your room',
            ephemeral: true
        })
        addUser(interaction.user.id, interaction.option.getMentionable("user"))
        interaction.reply({
            content: `User <@${interaction.option.getMentionable("user")}> added to your room!`,
            ephemeral: true
        });
    }
}