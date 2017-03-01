(function() {
    'use strict';
    
    angular
        .module("lttApp", [])
        .run(init)
        .controller("lttCtrl", lttCtrl);

    init.$inject = ["$rootScope"];
    function init($rootScope) {
        $rootScope.action10 = false;
        $rootScope.action10k = false;
    }

    lttCtrl.$inject = ["$scope", "$interval", "$timeout"];
    function lttCtrl($scope, $interval, $timeout) {
        var heart = angular.element(document.getElementsByClassName("heart-image"));
        var counter = angular.element(document.getElementsByClassName("counter"));
        var heartw = angular.element(document.getElementsByClassName("heart-wrapper"));
        var uinterval = $interval(update, 1);

        $interval(beat, 850);

        function update() {
            $scope.raw = (new Date(2017, 2, 27, 20, 0, 0, 0) - new Date());
            $scope.d = Math.floor($scope.raw / 1000 / 60 / 60 / 24);
            $scope.h = Math.floor(($scope.raw - $scope.d * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
            $scope.min = Math.floor(($scope.raw - $scope.d * 24 * 60 * 60 * 1000 - $scope.h * 60 * 60 * 1000) / 1000 / 60);
            $scope.s = Math.floor(($scope.raw - $scope.d * 24 * 60 * 60 * 1000 - $scope.h * 60 * 60 * 1000 - $scope.min * 60 * 1000) / 1000);
            $scope.ms = $scope.raw - $scope.d * 24 * 60 * 60 * 1000 - $scope.h * 60 * 60 * 1000 - $scope.min * 60 * 1000 - $scope.s * 1000;
            $scope.out = len("d") + $scope.d + len("h") + $scope.h + len("min") + $scope.min + len("s") + $scope.s + len("ms") + $scope.ms;
        }

        function len(v) {
            switch (v) {
                case "d":
                    if ($scope.d < 10) {
                        return "0";
                    } else return "";
                case "h":
                    if ($scope.h < 10) {
                        return "0";
                    } else return "";
                case "min":
                    if ($scope.min < 10) {
                        return "0";
                    } else return "";
                case "s":
                    if ($scope.s < 10) {
                        return "0";
                    } else return "";
                case "ms":
                    if ($scope.ms < 10) {
                        return "00";
                    } else if ($scope.ms < 100) {
                        return "0";
                    } else return "";
                default:
                    return "";
            }
        }

        function beat() {
            if (heart.hasClass("contraction")) {
                heart.removeClass("contraction");
                $timeout(function() {
                    heart.addClass("contraction");
                }, 550);
            } else {
                heart.addClass("contraction");
                $timeout(function() {
                    heart.removeClass("contraction");
                }, 200);
            }
        }

        $scope.$watch("raw", function(newVal) {
            if (newVal < 10000 && !$scope.action10k) {
                $scope.action10k = true;

                counter.css({
                    "font-size": "0"
                });

                heartw.css({
                    "width": "50vw",
                    "height": "45vw"
                });

                if (newVal/1000 > 0) {
                    counter.css({
                        "-webkit-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "-moz-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "-ms-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "-o-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "transition": (newVal/1000).toFixed(2) + "s all linear"
                    });

                    heartw.css({
                        "-webkit-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "-moz-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "-ms-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "-o-transition": (newVal/1000).toFixed(2) + "s all linear",
                        "transition": (newVal/1000).toFixed(2) + "s all linear"
                    });
                }
            }

            if (newVal <= 0 && !$scope.action10) {
                $scope.action10 = true;
                $interval.cancel(uinterval);
                $scope.out = "00000000000";
                counter.remove();
            }
        });
    }
})();