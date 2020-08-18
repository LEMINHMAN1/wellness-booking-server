const winston = require('winston');
const { isEmpty } = require('lodash');
const daos = require('../model/daos');
const collection = require('../constant/collection');

exports.userInfo =  (req, res) => {
    const userinfo = req.user;
    delete userinfo.password;
    return res.status(200).send(userinfo);
}