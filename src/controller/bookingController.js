const winston = require('winston');
const { isEmpty } = require('lodash');
const daos = require('../model/daos');
const collection = require('../constant/collection');
const { ObjectID } = require('mongodb');

exports.createBooking = async (req, res) => {
    const user = req.user;
    const userId = user._id;
    const username = user.username;
    var eventType = req.body.eventType;
    var location = req.body.location;
    var timeslot1 = req.body.timeslot1;
    var timeslot2 = req.body.timeslot2;
    var timeslot3 = req.body.timeslot3;

    const data = {
        username,
        userId,
        eventType,
        location,
        timeslot1,
        timeslot2,
        timeslot3,
        status: 'Pending Review'
    }

    const bookingCollection = daos.collection(collection.BOOKING);
    let bookingCompleted = await bookingCollection.insert(data);
    return res.status(200).send(bookingCompleted);
}

exports.removeBookingById = async (req, res) => {
    const userId = req.user._id;
    var _id = req.body.bookingId;

    if (isEmpty(_id)) {
        res.status(400).send('Missing booking id param');
        return;
    }
    const bookingCollection = daos.collection(collection.BOOKING);

    let completed = await bookingCollection.remove({ _id: ObjectID(_id), userId });
    return res.status(200).send(completed);
}

exports.updateBookingStatus = async (req, res) => {
    const user = req.user;
    const userRole = user.role;
    const _id = req.body.bookingId;
    const status = req.body.status;
    const reason = req.body.reason;
    const dateSlotSelected = req.body.slotSelected;

    if (userRole !== 'ADMIN') {
        res.status(400).send('Only Admin role can do this action.');
        return;
    }

    if (status !== 'Approved' && status !== 'Rejected') {
        res.status(400).send('Wrong status');
        return;
    }

    if(status === 'Rejected' && isEmpty(reason)){
        res.status(400).send('Must provide reason when you make and action Reject');
        return;
    }

    if(status === 'Approved' && isEmpty(dateSlotSelected)){
        res.status(400).send('Must confirm 1 Date Slot when you make and action Approved');
        return;
    } 


    if (isEmpty(_id)) {
        res.status(400).send('Missing booking id param');
        return;
    }
    const bookingCollection = daos.collection(collection.BOOKING);

    let completed = await bookingCollection.update({ _id: ObjectID(_id) }, { $set: { status, reason, dateSlotSelected } });
    return res.status(200).send(completed);
}

exports.getBookings = async (req, res) => {

    const user = req.user;
    const userId = user._id;
    const role = user.role;

    // If role is ADMIN, get all booking
    if (role === 'ADMIN') {
        const bookingCollection = daos.collection(collection.BOOKING);
        let bookings = await bookingCollection.find({ });

        res.status(200).send(bookings);
        return;
    }

    if (role !== 'ADMIN' && isEmpty(userId)) {
        res.sendStatus(401);
        return;
    }

    const bookingCollection = daos.collection(collection.BOOKING);
    let bookings = await bookingCollection.find({ userId });

    return res.status(200).send(bookings);
}