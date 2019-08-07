const models  = require('../models');
const driverLocations = new Array(5).fill(0).map((_, idx)=> {
    return {
        driverId: idx+1,
        positionX: idx+1,
        positionY: idx+1
    }
});
const MAX_NEAREST_DRIVER = 3;

const driverRideMap = new Map();

const assignRideToNearestDriver = (ride) => {
    const distArr = driverLocations.map((driverLocation, index)=>{
        const dist = Math.abs(driverLocation.positionX-ride.positionX)
                    + Math.abs(driverLocation.positionY-ride.positionY);
        return [
            driverLocation.driverId,
            dist
        ]
    }).sort((a,b) => a[1]-b[1]);

    for(let i = 0;i< distArr.length;i++) {
        if(i>=MAX_NEAREST_DRIVER) break;

        if(!driverRideMap.has(distArr[i][0])) {
            driverRideMap.set(distArr[i][0], [])
        }
        driverRideMap.get(distArr[i][0]).push(ride.id);
    }
}

(async () => {
    try {
        const rides = models.ride.findAll({where: {
            status: 'waiting'
        }});

        rides.map((ride) => {
            assignRideToNearestDriver(ride);
            return;
        });

        
    } catch (error) {
        throw error;
    }
})();

module.exports = {
    driverRideMap,
    assignRideToNearestDriver
}