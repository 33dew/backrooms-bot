const { getAndRemoveAllChanges } = require("./controllers/changesController");

module.exports = {
  changesUpdateLoop(client) {
    getAndRemoveAllChanges().then((changesList) => {
    console.log(changesList);
      changesList.forEach((change) => {
        const json = JSON.stringify(change);
        const test = JSON.parse(json);
        console.log(test.chatToRemove);
        console.log(change.Room);
        console.log(change.chatToRemove);
        console.log(change._doc.chatToRemove);
        console.log(Object.entries(change));
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
