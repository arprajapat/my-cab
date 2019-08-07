'use strict';

angular
    .module('app',[
        'ngResource',
        'app.services',
        'ngNotify'
    ])
    .controller('DriverAppController', ['$scope','$interval','ngNotify', 'acceptRequestService','getUsersRequestService', function($scope, $interval,ngNotify, acceptRequestService,getUsersRequestService) {
        $scope.requests;
        $scope.driverId =1;
        $scope.refresh = function() {
            if($scope.driverId>=1 && $scope.driverId<=5) {
                getUsersRequestService.get({driverId: $scope.driverId}, function (response) {
                    $scope.requests = {
                        waiting: response.data.filter((ride) => ride.status=='waiting'),
                        accepted: response.data.filter((ride) => ride.status=='accepted')
                    }
                }, function (err) {

                });
            }
            else {
                $scope.driverId=null;
                $scope.requests=null;
            }
        }
        $scope.isCompleted = function(time) {
            var date = new Date();
            time = new Date(time);
            var diff = date.valueOf()-time.valueOf();
            if(diff>=300000)
                return true;
            else
                return false;
        }

        $scope.getTime = function(time) {
            var date = new Date();
            var offset = date.getTimezoneOffset();
            time = new Date(time);
            var diff = date.valueOf()-time.valueOf();

            var t = new Date(diff.valueOf() + date.getTimezoneOffset() * 60000);
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var hour = t.getHours();

            if(hour) {
                return hour+" hr "+min+" min ago";
            }
            else if(min) {
                return min+" min "+sec+" sec ago";
            }
            else {
                return sec+" sec ago";
            }
        }

        $scope.getCompleteTime= function(time) {
            var date = new Date();
            var offset = date.getTimezoneOffset();
            time = new Date(time);
            var diff = date.valueOf()-time.valueOf();

            diff = diff-300000;

            var t = new Date(diff.valueOf() + date.getTimezoneOffset() * 60000);
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var hour = t.getHours();

            if(hour) {
                return hour+" hr "+min+" min ago";
            }
            else if(min) {
                return min+" min "+sec+" sec ago";
            }
            else {
                return sec+" sec ago";
            }
        }

        $scope.acceptRequest = function(rideId) {
            var isValidRequest = true;
            for(var i=0;i< $scope.requests.accepted.length;i++) {
                if(isValidRequest===true) {
                    isValidRequest =$scope.isCompleted($scope.requests.accepted[i].acceptedAt);
                }
            }
            if(isValidRequest) {
                acceptRequestService.save({driverId: $scope.driverId, rideId}, function (response) {
                    ngNotify.set(response.message);
                    $scope.refresh();
                }, function (err) {
                    ngNotify.set(err.message,'error');
                })
            }else {
                ngNotify.set('You already have ongoing ride', 'error');
            }
        }
        $scope.refresh();

        $scope.reloadTimer = $interval(function() {
            $scope.refresh();
        }, 5000);

        $scope.$on('$destroy', function() {
            $interval.cancel($scope.reloadTimer);
        });

    }]);