const {registerRoom, getRoom, updateRoom, archiveRoom, addUser, removeUser} = require('./controllers/roomController');
const Room = require('./models/room');

module.exports = {
    saveRoom: (name, ownerID, chatsIDs, categoryID) => {
        registerRoom(new Room(
            {
                name: name,  
                owner: ownerID, 
                chats: chatsIDs,
                category: categoryID
            }
        ));
    },
    archiveRoom: (ownerID) => {
        archiveRoom(ownerID)
    },
    addUser: async (ownerID, userID) => {
        const room = await getRoom(ownerID)
        Room.updateOne({ owner: ownerID, "settings.isArchived": false }, { users: [...room.users, userID] }, (err, room) => {
            if (err) {
                reject(err);
            } else {
                resolve(room);
            }
        });
    },
    removeUser: async (ownerID, userID) => {
        const room = await getRoom(ownerID)
        Room.updateOne({ owner: ownerID, "settings.isArchived": false }, { users: room.users.filter(user => user != userID) }, (err, room) => {
            if (err) {
                reject(err);
            } else {
                resolve(room);
            }
        });
    },
    getRoom: async (ownerID) => {
        const r = await getRoom(ownerID);
        const o = {
            name: r.name,
            owner: r.owner,
            users: r.users,
            chats: r.chats,
            category: r.category,
            settings: r.settings
        };
        return o;
    },
    updateRoom: (ownerID, room_data) => {
        const r = new Room({
            name: room_data.name,
            owner: room_data.owner,
            users: room_data.users,
            chats: room_data.chats,
            category: room_data.category,
            settings: room_data.settings
        });

        updateRoom(ownerID, r);
    },
    isUserHasRoom: async (userID) => {
        try {
            const room = await Room.findOne({owner: `${userID}`, 'settings.isArchived': false });
            if(room) return true;
        }   
        catch (err) {
            console.log(err);
        }
        return false;
    },
    isUserInRoom: async (ownerID, userID) => {
        try {
            const room = await Room.findOne({owner: `${ownerID}`, users: {$all: [`${userID}`]} });
            if(room) return true;
        }   
        catch (err) {
            console.log(err);
        }
        return false;
    }
}