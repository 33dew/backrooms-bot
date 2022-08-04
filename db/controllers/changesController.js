const Changes = require('../models/changes');
const Room = require('../models/room')

module.exports = {
    getAndRemoveAllChanges () {
        return new Promise((resolve, reject) => {
            Changes.find({}, (err, changes) => {
                if (err) {
                    reject(err);
                }
                if (changes) {
                    Changes.deleteMany({}, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                    resolve(changes);
                }
                resolve(null);
            });
        });
    },
    updateRoom (name, chats, category_id) {
        return new Promise((resolve, reject) => {
            Room.findOneAndUpdate({ category: category_id }, { name: name, chats: chats }, { new: true }, (err, room) => {
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
    getUsers (category_id) {
        return new Promise((resolve, reject) => {
            Room.findOne({ category: category_id }, (err, room) => {
                if (err) {
                    reject(err);
                }
                if (room) {
                    resolve([room.owner, ...room.users]);
                }
                resolve(null);
            });
        });
    }
}
