const Room = require('../models/room')
module.exports = {
    // CRUD
    createRoom (room) {
        return new Promise((resolve, reject) => {
            Room.create(room, (err, room) => {
                if (err) {
                    reject(err);
                } 
                if (room) {
                    resolve(true);
                }
                resolve(false);
            });
        });
    },
    getRoom (configID, serverID) {
        return new Promise((resolve, reject) => {
            Room.findOne({ "chats.0.channelid": configID, server: serverID }, (err, room) => {
                if (err) {
                    reject(err);
                } 
                if (room) {
                    resolve(room);
                }
                resolve(null);
            });
        });
    },
    getRooms (ownerID, serverID) {
        return new Promise((resolve, reject) => {
            Room.find({ owner: ownerID, server: serverID }, (err, rooms) => {
                if (err) {
                    reject(err);
                }
                if (rooms) {
                    resolve(rooms);
                }
                resolve(null);
            });
        });
    },
    updateRoom (configID, room, serverID) {
        return new Promise((resolve, reject) => {
            Room.findOneAndUpdate({ "chats.0.channelid": configID, server: serverID }, room, { new: true }, (err, room) => {
                if (err) {
                    reject(err);
                } 
                if (room) {
                    resolve(true);
                }
                resolve(false);
            });
        });
    },
    deleteRoom (configID, serverID) {
        return new Promise((resolve, reject) => {
            Room.findOneAndRemove({ "chats.0.channelid": configID, server: serverID }, (err, room) => {
                if (err) {
                    reject(err);
                } 
                if (room) {
                    resolve(true);
                }
                resolve(false);
            });
        });
    },
    isRoomConfigChannel(channelID, serverID) {
        return new Promise((resolve, reject) => {
            Room.findOne({ "chats.0.channelid": channelID, server: serverID }, (err, room) => {
                if (err) {
                    reject(err);
                }
                resolve(room);
            });
        });
    },
    isUserOwner(userID, channelID, serverID) {
        return new Promise((resolve, reject) => {
            Room.findOne({ chats: { "$all.channelid": [channelID] }, owner: userID, server: serverID }, (err, room) => {
                if (err) {
                    reject(err);
                }
                resolve(room);
            });
        });
    }

}