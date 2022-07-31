const { getAndRemoveAllChanges } = require('./controllers/changesController');

module.exports = {
    changesUpdateLoop () {
        getAndRemoveAllChanges().then(changesList => {
            console.log(changesList);
        });
    }
}