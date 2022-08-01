const { getAndRemoveAllChanges } = require("./controllers/changesController");

module.exports = {
  changesUpdateLoop(client) {
    getAndRemoveAllChanges().then((changesList) => {
    console.log(changesList);
      changesList.forEach(async (change) => {
        const json = JSON.stringify(change);
        const test = JSON.parse(json);
        console.log(test)
        console.log(test.chatToRemove);
        console.log(change['chatToRemove']);
        // await Promise.all(
        //   change.chatToRemove.map(async (chat) => {
        //     if (client.channels.cache.get(chat) != null) {
        //       await client.channels.cache.get(chat).delete();
        //     }
        //   })
        // );
        // change.Room.forEach(async (room) => {
        //     const categoryChannel = client.channels.cache.get(room.category);
        //     console.log(categoryChannel);
        // });
      });
    });
  },
};
