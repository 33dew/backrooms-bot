const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const { returnStartTemplate } = require('../../local/template')
const { createRoomEmbed } = require('../../utils/embeds')
const { createRoomComponent } = require('../../utils/components')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("starter")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Kanały startowe bota"),
    async execute(interaction) {
        const template = await returnStartTemplate();
        
        const category = await interaction.guild.channels.create({
            name: template.category_name,
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                }]
        })
        const role = interaction.guild.roles.cache.find(r => r.name === "@everyone");
        const c1 = await interaction.guild.channels.create({
            name: template.text_chats[0]._name,
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: [PermissionFlagsBits.SendMessages],
                }
            ]
        })
        
        const c2 = await interaction.guild.channels.create({
            name: template.text_chats[1]._name,
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: [PermissionFlagsBits.SendMessages],
                }
            ]
        })
        c1.send({
            content: template.text_chats[0].content.replace('{stworz}', `<#${c2.id}>`)
        })
        c2.send({
            embeds: [createRoomEmbed],
            components: [createRoomComponent]
        })
        interaction.reply({
            content: "Kanały startowe stworzone!",
            ephemeral: true
        });
    }
}