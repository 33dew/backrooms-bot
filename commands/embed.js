const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js')

const embeds = {
    createRoom: new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setTitle('Create room')
        .setDescription('Click button below to create a private rooms section on our server!')
        .setFooter({ text: '• Backrooms'})
        .setTimestamp()
}

const components = {
    createRoom: new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('create_room')
                        .setLabel('Create!')
                        .setStyle(ButtonStyle.Success),
                )
}


module.exports = {
    data:  new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sending an embed")
        .addStringOption(option => 
            option.setName("category")
            .setDescription('The embed category')
            .setRequired(true)
            .addChoices(
                { name: 'Create room', value: 'create_room' }
            )),
    async execute(interaction) {
        switch(interaction.options.getStringOption("category")){
            case 'create_room': {
                interaction.channel.send({
                    embeds: [embeds.createRoom],
                    components: [components.createRoom]
                })
                break;
            }
            default: 
                break;
        }
        interaction.reply({
            content: "Sent!",
            ephemeral: true
        });
    }
}