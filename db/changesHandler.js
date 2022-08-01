const { getAndRemoveAllChanges } = require("./controllers/changesController");

module.exports = {
  changesUpdateLoop(client) {
    getAndRemoveAllChanges().then((changesList) => {
    console.log(changesList);
      changesList.forEach(async (change) => {
        await Promise.all(
          change._doc.chatToRemove.map(async (chat) => {
            if (client.channels.cache.get(chat) != null) {
              await client.channels.cache.get(chat).delete();
            }
          })
        );
        const categoryChannel = client.channels.cache.get(change.Room.category);
        console.log(categoryChannel);
      });
    });
  },
};
