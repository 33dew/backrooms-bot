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
    getRoom (configID) {
        return new Promise((resolve, reject) => {
            Room.findOne({ "chats.0": configID }, (err, room) => {
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
    getRooms (ownerID) {
        return new Promise((resolve, reject) => {
            Room.find({ "owner": ownerID }, (err, rooms) => {
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
    updateRoom (configID, room) {
        return new Promise((resolve, reject) => {
            Room.findOneAndUpdate({ "chats.0": configID }, room, { new: true }, (err, room) => {
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
    deleteRoom (configID) {
        return new Promise((resolve, reject) => {
            Room.findOneAndRemove({ "chats.0": configID }, (err, room) => {
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
    isRoomConfigChannel(channelID) {
        return new Promise((resolve, reject) => {
            Room.findOne({ "chats.0": channelID }, (err, room) => {
                console.log(room, err);
                if (err) {
                    reject(err);
                }
                resolve(room);
            });
        });
    }
}