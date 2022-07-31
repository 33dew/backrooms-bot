const Changes = require('../models/changes');

module.exports = {
    getAndRemoveAllChanges () {
        return new Promise((resolve, reject) => {
            Changes.find({}).remove((err, changes) => {
                if (err) {
                    reject(err);
                }
                if (changes) {
                    resolve(changes);
                }
                resolve(null);
            });
        });
    }
}
