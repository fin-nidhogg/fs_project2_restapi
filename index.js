///////////////////////////////////////////////////
// Geneeriset importit
///////////////////////////////////////////////////

require('dotenv').config();
const express = require('express');
const db = require('./db');
const apiroutes = require('./routes/api');

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

///////////////////////////////////////////////////
// Default reitti jollei muuta löydy
///////////////////////////////////////////////////

app.get('*', (req, res) => {
    res.send('There\'s nothing here! You should not be here!</br>All functionality is in the <b>/api</b> route and should be accessed through requests made programmatically.');
});


///////////////////////////////////////////////////
// Käynnistetään serveri
///////////////////////////////////////////////////

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is starting on port ${process.env.SERVER_PORT} \nYou can access the aplication at http://localhost:${process.env.SERVER_PORT}`);
});
