///////////////////////////////////////////////////
// Geneeriset importit
///////////////////////////////////////////////////

require('dotenv').config();
const express = require('express');
const db = require('./db');
const apiroutes = require('./routes/api');
const { errorHandler } = require('./middleware/errors.middleware');

///////////////////////////////////////////////////
// Luodaan express sovellus ja määritetään middlewaret
///////////////////////////////////////////////////

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////////////////////////////////
// Otetaan api routet käyttöön
///////////////////////////////////////////////////

app.use('/api', apiroutes);
app.use(errorHandler);

///////////////////////////////////////////////////
// Default reititykset virheellisille osoitteille
///////////////////////////////////////////////////

app.all('*', (req, res) => {
    const message = 'Invalid URL in request, please check the URL and try again.';
    res.status(404).json({ message });
});

///////////////////////////////////////////////////
// Käynnistetään serveri
///////////////////////////////////////////////////

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is starting on port ${process.env.SERVER_PORT} \nYou can access the aplication at http://localhost:${process.env.SERVER_PORT}`);
});
