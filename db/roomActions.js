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
    getRoom (roomName) {
        return new Promise((resolve, reject) => {
            Room.findOne({ name: roomName }, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    },
    updateRoom (roomName, room) {
        return new Promise((resolve, reject) => {
            Room.findOneAndUpdate({ name: roomName }, room, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            });
        });
    }
}