const { getAndRemoveAllChanges } = require('./controllers/changesController');

module.exports = {
    changesUpdateLoop () {
        getAndRemoveAllChanges().then(changesList => {
            changesList.forEach(changes => {
                console.log(changes);
            });
        });
    }
}