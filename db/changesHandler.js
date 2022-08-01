const { getAndRemoveAllChanges, updateRoom } = require("./controllers/changesController");

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
            const channel = client.channels.cache.get(chat.channelid);
            if (channel != null) {
              if (channel.name != chat.name) {
                await channel.setName(chat.name);
              }
              if (channel.type == 2 && channel.userLimit != chat.voice_max) {
                await channel.setUserLimit(chat.voice_max);
              }
            }
          })
        );

        await updateRoom(change.Room.name, change.Room.chats, change.Room.category);
      });
    });
  },
};
