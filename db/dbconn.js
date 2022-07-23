const mongoose = require('mongoose');

// Make connect to mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'DiscordBackrooms'
}).then(() => {
    console.log('Connected to Database');
});