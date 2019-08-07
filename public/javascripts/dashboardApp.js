'use strict';

angular
    .module('app',[
        'ngResource',
        'app.services',
        'ngNotify'
    ])
    .controller('DashboardAppController', ['$scope', 'getAllRequestService', 'ngNotify', function($scope, getAllRequestService, ngNotify) {

        $scope.requests;
        $scope.refresh = function() {
            getAllRequestService.get({}, function (response) {
                $scope.requests = response.data;
            }, function (err) {
                // console.log('err', err.message)
                ngNotify.set(error.message, 'error');
            });
        }

        $scope.getTime= function(time) {
            var date = new Date();
            var offset = date.getTimezoneOffset();
            time = new Date(time);
            var diff = date.valueOf()-time.valueOf();
            if(diff>=300000)
                diff = diff-300000;

            var t = new Date(diff.valueOf() + date.getTimezoneOffset() * 60000);
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var hour = t.getHours();

            if(hour) {
                return hour+" hr "+min+" min";
            }
            else if(min) {
                return min+" min "+sec+" sec";
            }
            else {
                return sec+" sec";
            }
        }

        $scope.getStatus = function(time) {
            var date = new Date();
            time = new Date(time);
            var diff = date.valueOf()-time.valueOf();
            if(diff>=300000)
                return "Completed";
            else
                return "Ongoing";
        }

        $scope.refresh();

    }]);