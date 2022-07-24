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
            Room.findOne({ owner: ownerID, "settings.isArchived": false }, (err, room) => {
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
            Room.findOneAndUpdate({ owner: ownerID, "settings.isArchived": false }, room, (err, room) => {
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
            Room.updateOne({ owner: ownerID, "settings.isArchived": false }, { "settings.isArchived": true }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    addUser(ownerID, users) {
        return new Promise((resolve, reject) => {
            Room.updateOne({ owner: ownerID, "settings.isArchived": false }, { users }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    addChannels(ownerID, chats) {
        return new Promise((resolve, reject) => {
            Room.updateOne({ owner: ownerID, "settings.isArchived": false }, { chats: [...chats] }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    removeUser(ownerID, users) {
        return new Promise((resolve, reject) => {
            Room.updateOne({ owner: ownerID, "settings.isArchived": false }, { users }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    }
}