const Room = require('../models/room')
module.exports = {
    registerRoom (room) {
        return new Promise((resolve, reject) => {
            Room.create(room, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    getRoom (ownerID) {
        return new Promise((resolve, reject) => {
            Room.findOne({ owner: ownerID }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    updateRoom (ownerID, room) {
        return new Promise((resolve, reject) => {
            Room.findOneAndUpdate({ owner: ownerID }, room, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    archiveRoom(ownerID) {
        return new Promise((resolve, reject) => {
            Room.updateOne({ owner: ownerID, "settings.isArchive": false }, { "settings.isArchive": true }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    }
}