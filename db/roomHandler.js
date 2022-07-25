const { createRoom, getRoom, getRooms, updateRoom, deleteRoom, isUserOwner, isRoomConfigChannel } = require('./controllers/roomController');
const Room = require('./models/room');


module.exports = {
    makeRoom: (name, ownerID, chatsIDs, categoryID, serverID) => {
        createRoom(new Room(
            {
                name: name,  
                owner: ownerID, 
                chats: chatsIDs,
                category: categoryID,
                server: serverID
            }
        ));
    },
    collectRoom: (configID, serverID) => {
        return getRoom(configID, serverID) ? getRoom(configID, serverID) : null;
    },
    removeRoom: (configID, serverID) => {
        deleteRoom(configID, serverID);
    },
    isConfigChannel: async (chatID, serverID) => {
        return await isRoomConfigChannel(chatID, serverID) ? true : false;
    },
    archiveRoom: async (configID, serverID) => {
        const room = await getRoom(configID, serverID);
        room.isArchived = true;
        updateRoom(configID, room, serverID);
    },
    configureRoom: async (configID, serverID) => {
        const room = await getRoom(configID, serverID);
        room.settings.isConfigured = true;
        updateRoom(configID, room, serverID);
    },
    addChannel: async (configID, channelID, serverID) => {
        const room = await getRoom(configID, serverID);
        room.chats.push(channelID);
        updateRoom(configID, room, serverID);
    },
    addUser: async (configID, userID, serverID) => {
        const room = await getRoom(configID, serverID);
        room.users.push(userID);
        updateRoom(configID, room, serverID);
    },
    removeUser: async (configID, userID, serverID) => {
        const room = await getRoom(configID, serverID);
        room.users = room.users.filter(user => user !== userID);
        updateRoom(configID, room, serverID);
    },
    howManyRoomsActiveRoom: async (ownerID, serverID) => {
        const rooms = await getRooms(ownerID, serverID);
        return rooms.filter(room => room.settings.isArchived === false).length;
    },
    isUserInRoom: async (configID, userID, serverID) => {
        const room = await getRoom(configID, serverID);
        return room.users.includes(userID);
    },
    isUserOwner: async (userID, channelID, serverID) => {
        return await isUserOwner(userID, channelID, serverID) ? true : false;
    },
    collectCategory: async (configID, serverID) => {
        const room = await getRoom(configID, serverID);
        return room.category ? room.category : null;
    }
}