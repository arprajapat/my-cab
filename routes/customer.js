const express = require('express');
const router = express.Router();
const models  = require('../models');


router.get('/', (req, res, next) => {
  res.render('customerapp', { title: 'Customer App' });
});

router.post('/:customerId/ride', (req, res, next) => {
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
  
  return models.ride.create(rideObj).then((ride) => {
    res.status(201).end(JSON.stringify({data:ride, message: 'Ride requested successfully'}))
  },(err) => {
    console.log("error while creating user:",err);
    res.status(500).end(JSON.stringify({err:"Internal server error"}));
  });
})

module.exports = router;
