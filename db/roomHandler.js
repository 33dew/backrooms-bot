const {registerRoom, getRoom, updateRoom} = require('./controllers/roomController');
const Room = require('./models/room');

module.exports = {
    saveRoom: (name, ownerID, chatsIDs) => {
        registerRoom(new Room(
            {
                name: name,  
                owner: ownerID, 
                chats: chatsIDs
            }
        ));
    },
    getRoom: async (ownerID) => {
        const r = await getRoom(ownerID);
        const o = {
            name: r.name,
            owner: r.owner,
            users: r.users,
            chats: r.chats,
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
    }
}