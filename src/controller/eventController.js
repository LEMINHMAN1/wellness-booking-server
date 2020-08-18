const winston = require('winston');
const { isEmpty } = require('lodash');
const daos = require('../model/daos');
const collection = require('../constant/collection');

exports.getAllEventType = async (req, res) => {

    const eventCollection = daos.collection(collection.EVENT_TYPE);
    let events = await eventCollection.find({});

    return res.status(200).send(events);
}