const { getAndRemoveAllChanges, updateRoom, getUsers } = require("./controllers/changesController");
const { ChannelType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  changesUpdateLoop(client) {
    getAndRemoveAllChanges().then((changesList) => {
      changesList.forEach(async (change) => {
        await Promise.all(
          change._doc.chatToRemove.map(async (chat) => {
            if (client.channels.cache.get(chat) != null) {
              await client.channels.cache.get(chat).delete();
            }
          })
        );
        const categoryChannel = client.channels.cache.get(change.Room.category);
        if (categoryChannel.name != change.Room.name) {
          await categoryChannel.setName(change.Room.name);
        }
        await Promise.all(
          change.Room.chats.map(async (chat) => {
            if (chat.channelid.startsWith("new_")) {
                let c;
                let users = await getUsers(change.Room.category);
                if (chat.type == "text") {
                  c = await categoryChannel.guild.channels.create({
                    name: chat.name,
                    type: ChannelType.GuildText,
                    parent: categoryChannel,
                    permissionOverwrites: [
                        {
                            id: categoryChannel.guild.id,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: users[0],
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageMessages],
                        },
                      ]})
                }
                else {
                  c = await categoryChannel.guild.channels.create({
                    name: chat.name,
                    type: ChannelType.GuildVoice,
                    userLimit: chat.voice_max,
                    parent: categoryChannel,
                    permissionOverwrites: [
                        {
                            id: categoryChannel.guild.id,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: users[0],
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MoveMembers, PermissionFlagsBits.MuteMembers],
                        },
                      ]})
                }
                users.slice(1).forEach(e => {
                  c.permissionOverwrites.edit(e, { ViewChannel: true })
                });
                chat.channelid = c.id;
            }
            else {
              const channel = client.channels.cache.get(chat.channelid);
              if (channel != null) {
                if (channel.name != chat.name) {
                  await channel.setName(chat.name);
                }
                if (channel.type == 2 && channel.userLimit != chat.voice_max) {
                  await channel.setUserLimit(chat.voice_max);
                }
              }
            }
          })
        );

        await updateRoom(change.Room.name, change.Room.chats, change.Room.category);
      });
    });
  },
};
