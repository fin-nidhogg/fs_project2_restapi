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
        const message = `${event.name} added successfully!`;
        res.status(201).json({ message });
        console.log(`\nSUCCESS: Event added to database:\n${event}`);
    }
    catch (error) {
        console.log(err);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////
// Reitti dokumentin poistamiseksi tietokannasta
///////////////////////////////////////////////////

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).json({ "message": "Wrongly formated document id" });
    }
    else {
        try {
            const event = await Event.findByIdAndDelete(id)
            if (!event) {
                return res.status(404).json({ "message": "Event not found" });
            } else {
                const message = `Event with ID ${id} deleteted succesfully`;
                res.status(200).json({ message });
                console.log(`\nSUCCESS: Event with ID ${id} destroyed: \n\n${event} `);
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
        return res.status(404).json({ "message": "Wrongly formated document id" });
    }
    else {
        try {
            const event = await Event.findById(id)
            if (!event) {
                return res.status(404).json({ "message": "Event with given ID not found" });
            } else {
                res.status(200).send(event);
                console.log(`\nOK Here's your event data:\n\n ${event}`);
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
        return res.status(404).json({ "message": "Wrongly formated document id" });
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
                return res.status(404).json({ "message": "Event with given ID not found" });
            }
            const message = `Event ${event.name} with ID ${id} updated succesfully`
            res.status(200).json({ message });
            console.log(`Incoming update data:\n \n ${event}`);
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