const express = require('express');
const router = express.Router();
const models  = require('../models');


router.get('/', (req, res, next) => {
  res.render('customerapp', { title: 'Customer App' });
});

router.post('/:customerId/ride', async (req, res, next) => {
  //Todo: add data sanity and validation check
  const customerId = req.params.customerId;
  const { positionX, positionY } = req.body

  const rideObj = {
    customerId,
    positionX,
    positionY,
    status: 'waiting',
    requestedAt: new Date()
  }
  try {
    const waitingRides = await models.ride.count({ where: {status: 'waiting' }});
    if(waitingRides > 10) {
      res.end(JSON.stringify({message: 'Rides not available. Try again later'}))
    }

    const ride = await models.ride.create(rideObj);
    res.status(201).end(JSON.stringify({data:ride, message: 'Ride requested successfully'}))
  } catch (error) {
    res.status(500).end(JSON.stringify({err:"Internal server error"}));
  }
})

module.exports = router;
