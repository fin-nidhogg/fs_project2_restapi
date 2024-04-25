const mongoose = require('mongoose');

// Määritetään tietokantayhteys
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);

const db = mongoose.connection;

// Avataan yhteys tai virheen tapahtuessa tulostetaan virheilmoitus
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connection established successfully');
});