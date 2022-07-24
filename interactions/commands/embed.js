const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { createRoomEmbed } = require('../../utils/embeds')
const { createRoomComponent } = require('../../utils/components')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sending an embed")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option.setName("category")
            .setDescription('The embed category')
            .setRequired(true)
            .addChoices(
                { name: 'Create room', value: 'create_room' }
            )),
    async execute(interaction) {
        switch(interaction.options.getString("category")){
            case 'create_room': {
                interaction.channel.send({
                    embeds: [createRoomEmbed],
                    components: [createRoomComponent]
                })
                break;
            }
            default: 
                break;
        }
        interaction.reply({
            content: "Wysłano!",
            ephemeral: true
        });
    }
}