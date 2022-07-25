const { SlashCommandBuilder } = require('discord.js')
const { addUser, isUserInRoom, collectRoom, isUserOwner } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Usuń wybraną ilość wiadomości")
        .addIntegerOption(input =>
            input.setName("ilość")
            .setDescription('ile?')
            .setMinValue(1)
            .setMaxValue(99)
            .setRequired(true)
        ),
    async execute(interaction) {
        let _isUserOwner = await isUserOwner(interaction.user.id ,interaction.channel.id);
        if (!_isUserOwner) {
            return interaction.reply({
                content: "Nie jesteś właścicielem pokoju",
                ephemeral: true
            })
        }
        await interaction.channel.bulkDelete(interaction.options.getInteger("ilość"))
        interaction.reply({
            content: `Usunięto ${interaction.options.getInteger("ilość")} wiadomości`,
            ephemeral: true
        });
    }
}