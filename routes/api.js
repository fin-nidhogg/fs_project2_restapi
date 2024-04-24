const express = require('express');
const Event = require('../models/events');
const router = express.Router();

///////////////////////////////////////////////////
// Reitti jolla haetaan kaikki tietokannan dokumentit ja lähetetään ne käyttäjälle
///////////////////////////////////////////////////

router.get('/all', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
        console.log(`\nOK: Sending event objects: \n\n${events}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send
    }
});

///////////////////////////////////////////////////
// Reitti uuden dokumentin luomiseksi tietokantaan vastaanotetun JSON objektin perusteella
///////////////////////////////////////////////////

router.post('/add', async (req, res) => {
    const {
        name,
        date,
        location,
        description,
        published_until
    } = req.body;

    console.log(`\nGET DOWN! Data incoming:\n ${JSON.stringify(req.body)}`)

    try {
        const event = new Event({
            name: name,
            date: date,
            location: location,
            description: description,
            published_until: published_until
        });

        await event.save();
        res.status(201).send(`${event.name} added successfully!`);
        console.log(`\nSUCCESS: Event added to database:\n${event}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

///////////////////////////////////////////////////
// Reitti dokumentin poistamiseksi tietokannasta
///////////////////////////////////////////////////

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).send('Event not found\nCheck the event id and try again!');
    }
    else {
        try {
            const event = await Event.findByIdAndDelete(id)
            if (!event) {
                return res.status(404).send('Event not found\nCheck the event id and try again!');
            } else {
                res.status(200).send(`Event with ID ${id} deleteted succesfully\n\n${event}`);
                console.log(`SUCCESS: Event with ID ${id} destroyed:\n${event}`);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

///////////////////////////////////////////////////
// Reitti jolla haetaan haluttu dokumentti tietokannasta
///////////////////////////////////////////////////

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).send('Event not found\nCheck the event id and try again!');
    }
    else {
        try {
            const event = await Event.findById(id)
            if (!event) {
                return res.status(404).send('Event not found\nCheck the event id and try again!');
            } else {
                res.status(200).send(event);
                console.log(`OK Here's your event data:\n ${event}`);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

///////////////////////////////////////////////////
// Reitti jolla päivitetään haluttua dokumenttia tietokannassa
///////////////////////////////////////////////////

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).send('Event not found\nCheck the event id and try again!');
    }
    else {
        const {
            name,
            date,
            location,
            description,
            published_until
        } = req.body;

        try {
            const event = await Event.findByIdAndUpdate(id, {
                name: name,
                date: date,
                location: location,
                description: description,
                published_until: published_until
            }, { new: true });

            if (!event) {
                return res.status(404).send('Event not found\nCheck the event id and try again!');
            }

            res.status(200).send(event);
            console.log(`Getting updated info:\n \n ${event}`);
            console.log(`\nSUCCESS: you updated event with id: ${id}`);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});


///////////////////////////////////////////////////
// Exportataan router, jotta se voidaan ottaa käyttöön muualla sovelluksessa
///////////////////////////////////////////////////

module.exports = router