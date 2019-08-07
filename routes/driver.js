const express = require('express');
const router = express.Router();
const models  = require('../models');
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

router.get('/', (req, res, next) => {
    res.render('driverapp', { title: 'Driver App' });
});

router.get('/:driverId/ride', (req, res, next) => {
    const { driverId } = req.params;

    return models.ride.findAll({where: {
        [Op.or]: [{driverId}, {status: 'waiting'}],
    }}).then((rides) => {
        res.end(JSON.stringify({data:rides}))
      }, (err) => {
        res.status(500).end();
    });
})

// This should be put method
router.post('/:driverId/ride/:rideId', (req, res, next) => {
    // There should be check here if any ongoing ride is there 
    // before accepting new ride 
    const { driverId, rideId } = req.params;
    const rideObj = {
        status: 'accepted',
        acceptedAt: new Date(),
        driverId,
    };
    
    return models.ride.update(rideObj, { where: {
        id: rideId,
        status: 'waiting'
    }}).then(([affectedCount]) => {
        if(affectedCount === 0) {
            res.status(400).end(JSON.stringify({message:"Ride is no longer waiting"}));
        } else {
            res.end(JSON.stringify({message:"Ride Started"}));
        }
      }, (err) => {
        console.log(err);
        res.status(500).end(JSON.stringify({message:"Internal server error"}));
    });
})

module.exports = router;

