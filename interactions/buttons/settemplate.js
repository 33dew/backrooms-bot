const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { returnTemplates } = require('../../local/template')
module.exports = {
    async execute(interaction) {
        const menu = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('template')
					.setPlaceholder('Wybierz szablon')
					.addOptions(
                        ...returnTemplates().map(t => {
                            return {
                                label: t,
                                description: 'Wybierz szablon',
                                value: t,
                            }
                        })
					),
			);
        await interaction.reply({
            components: [menu]
        })
    }
}