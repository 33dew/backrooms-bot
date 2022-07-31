const Changes = require('../models/changes');

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
    }
}
