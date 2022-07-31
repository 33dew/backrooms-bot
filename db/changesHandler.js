const { getAndRemoveAllChanges } = require('./controllers/changesController');

module.exports = {
    getAllChanges () {
        return getAndRemoveAllChanges();
    },
    changesUpdateLoop () {
        this.getAllChanges().then(changesList => {
            changesList.forEach(changes => {
                console.log(changes);
            });
        });
    }
}