const express = require('express');
const router = express.Router();
const models  = require('../models');

router.get('/ride', (req, res, next) => {
    return models.ride.findAll().then((rides) => {
        res.end(JSON.stringify({data: rides}))
      },(err) => {
        res.status(500).end(JSON.stringify({err:"Internal Server Error"}));
    });
})

module.exports = router;
