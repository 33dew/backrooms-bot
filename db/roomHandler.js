const { createRoom, getRoom, getRooms, updateRoom, deleteRoom, isRoomConfigChannel } = require('./controllers/roomController');
const Room = require('./models/room');


module.exports = {
    makeRoom: (name, ownerID, chatsIDs, categoryID) => {
        createRoom(new Room(
            {
                name: name,  
                owner: ownerID, 
                chats: chatsIDs,
                category: categoryID
            }
        ));
    },
    collectRoom: (configID) => {
        return getRoom(configID) ? getRoom(configID) : null;
    },
    removeRoom: (configID) => {
        deleteRoom(configID);
    },
    isConfigChannel: async (chatID) => {
        return await isRoomConfigChannel(chatID) ? true : false;
    },
    archiveRoom: async (configID) => {
        const room = await getRoom(configID);
        room.archived = true;
        updateRoom(configID, room);
    },
    configureRoom: async (configID) => {
        const room = await getRoom(configID);
        room.settings.configured = true;
        updateRoom(configID, room);
    },
    addChannel: async (configID, channelID) => {
        const room = await getRoom(configID);
        room.chats.push(channelID);
        updateRoom(configID, room);
    },
    addUser: async (configID, userID) => {
        const room = await getRoom(configID);
        room.users.push(userID);
        updateRoom(configID, room);
    },
    removeUser: async (configID, userID) => {
        const room = await getRoom(configID);
        room.users = room.users.filter(user => user !== userID);
        updateRoom(configID, room);
    },
    howManyRoomsActiveRoom: async (ownerID) => {
        const rooms = await getRooms(ownerID);
        return rooms.filter(room => room.settings.achived === false).length;
    },
    isUserInRoom: async (configID, userID) => {
        const room = await getRoom(configID);
        return room.users.includes(userID);
    },
    collectCategory: async (configID) => {
        const room = await getRoom(configID);
        return room.category ? room.category : null;
    }
}