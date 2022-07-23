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
    getRoom: async (room_name) => {
        const r = await getRoom(room_name);
        const o = {
            name: r.name,
            owner: r.owner,
            users: r.users,
            chats: r.chats,
            settings: r.settings
        };
        return o;
    },
    updateRoom: (room_name, room_data) => {
        const r = new Room({
            name: room_data.name,
            owner: room_data.owner,
            users: room_data.users,
            chats: room_data.chats,
            settings: room_data.settings
        });

        updateRoom(room_name, r);
    },
    isUserHasRoom: async (userID) => {
        await Room.findOne({owner: `${userID}`}, (err, room) => {
            if (err) {
                console.log(err);
            }
            console.log(room);
            if (room) {
                return true;
            }
        });
        return false;
    }
}