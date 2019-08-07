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
router.post('/:driverId/ride/:rideId', async (req, res, next) => {
    
    const { driverId, rideId } = req.params;
    const rideObj = {
        status: 'accepted',
        acceptedAt: new Date(),
        driverId,
    };
    try {
        const ongoingRides = await models.ride.count({ 
            where: {
                driverId,
                status: 'accepted', 
                acceptedAt: {
                    [Op.gte] : new Date() - 300000
                },
            }
        });
        if(ongoingRides > 0) {
            res.end(JSON.stringify({message:"You already have ongoing ride"}));
        }

        const [ affectedCount ] = await models.ride.update(rideObj, { where: {
            id: rideId,
            status: 'waiting'
        }})

        if(affectedCount === 0) {
            res.end(JSON.stringify({message:"Ride is no longer waiting"}));
        } else {
            res.end(JSON.stringify({message:"Ride Started"}));
        }

    } catch (error) {
        res.status(500).end(JSON.stringify({message:"Internal server error"}));
    }
})

module.exports = router;

