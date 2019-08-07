'use strict'

angular
    .module('app.services', [])
    .service( [function() {

    }]).factory('requestRideService', function($resource) {
        return $resource('/customer/:customerId/ride', { customerId: '@customerId' });
    }).factory('acceptRequestService', function($resource) {
        return $resource('/driver/:driverId/ride/:rideId', {driverId: '@driverId',rideId: '@rideId'});
    }).factory('getUsersRequestService', function($resource) {
        return $resource('/driver/:driverId/ride');
    }).factory('getAllRequestService', function($resource) {
        return $resource('/admin/ride');
    });
