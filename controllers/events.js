const { response } = require("express");
const Event = require("../models/Event");


const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'nombre');
    res.json({ ok: true, message: 'List of events', events });
};

const createEvent = async (req, res = response) => {
    const { title, notes, start, end } = req.body;

    const event = new Event({ title, notes, start, end, user: req.uid });
    try {

        const eventoGuardado = await event.save();

        res.status(201).json({ ok: true, message: 'Event created successfully', event: eventoGuardado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error creating event' });
    }
};

const updateEvent = async (req, res = response) => {
    const { title, notes, start, end } = req.body;
    try {

        const updateEvent = await Event.findById(req.params.id);
        if (!updateEvent) {
            return res.status(404).json({ ok: false, message: 'Event not found' });
        }

        if (updateEvent.user.toString() !== req.uid) {
            return res.status(401).json({ ok: false, message: 'User not authorized to update this event' });
        }

        updateEvent.title = title;
        updateEvent.notes = notes;
        updateEvent.start = start;
        updateEvent.end = end;

        await updateEvent.save();

        res.json({ ok: true, message: `Event with ID ${req.params.id} updated successfully`, event: updateEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error updating event' });
    }
};

const deleteEvent = async (req, res = response) => {

    try {

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ ok: false, message: 'Event not found' });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({ ok: false, message: 'User not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ ok: true, message: `Event with ID ${req.params.id} deleted successfully`, event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error deleting event' });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};