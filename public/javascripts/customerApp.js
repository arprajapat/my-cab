'use strict';

angular
    .module('app',[
        'ngResource',
        'app.services',
        'ngNotify'
    ])
    .controller('CustomerAppController', ['$scope', 'requestRideService', 'ngNotify', function($scope, requestRideService, ngNotify) {
        $scope.customerId = 100;
        $scope.posX;
        $scope.posY;

        $scope.requestRide = function() {
            if($scope.posX==undefined || $scope.posY==undefined || $scope.customerId==undefined) {
                ngNotify.set('please fill all entries', 'error');
            }
            else {
                requestRideService.save({
                    customerId: $scope.customerId,
                    positionX: $scope.posX,
                    positionY: $scope.posY
                }, function (response) {
                    ngNotify.set(response.message);
                }, function (error) {
                    ngNotify.set(error.message, 'error');
                });
            }
        }

    }]);