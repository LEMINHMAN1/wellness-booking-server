const express = require('express');
const { isEmpty } = require('lodash');
const passport = require('passport');
const userController = require('./../controller/userController');
const eventController = require('./../controller/eventController');
const bookingController = require('./../controller/bookingController');
const authController = require('./../controller/authenticateController');

var app = module.exports = express.Router();

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (user, done) => {
    return done(null, false)
});

const auth = ()=>{
    return passport.authenticate('authenticate')
}

// Authenticate
app.post('/login', authController.login);
app.post('/token', authController.newToken);

// User info
app.get('/userinfo', auth(), userController.userInfo);

// All constants event type
app.get('/event/getAll', auth(), eventController.getAllEventType);

// Booking
app.post('/booking/create', auth(), bookingController.createBooking);
app.get('/booking/getAll', auth(), bookingController.getBookings);
app.delete('/booking/removeById', auth(), bookingController.removeBookingById);
app.patch('/booking/updateStatus', auth(), bookingController.updateBookingStatus);