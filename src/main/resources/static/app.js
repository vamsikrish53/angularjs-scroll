app = angular.module("app", []);

app.controller("EmpCtrl", function ($scope, $http, $timeout) {

    $scope.empList = [];
    $scope.total = 0;
    $scope.current = 0;
    $scope.offSet = 0;
    $scope.limit = 100;
    $scope.loading = false;

    $scope.loadResults = function () {
        if ($scope.loading)
            return;
        $scope.loading = true;


        $scope.restUrl = "/getEmployees?offSet=" + $scope.offSet + "&limit=" + $scope.limit;
        $timeout(function () {
            $http({
                method: "GET",
                url: $scope.restUrl
            }).then(function (res) {
                var empNames = res['data']['names'];
                if (empNames)
                    for (name in empNames)
                        $scope.empList.push(empNames[name]);
                $scope.total = res['data']['totalCount'];
                $scope.current = $scope.current + res['data']['currentCount'];
                // Update the offset
                $scope.offSet = $scope.current;
                $scope.loading = false;
            });
        }, 1000);
    }

    $scope.loadResults();
});

// we create a simple directive to modify behavior of div
app.directive("whenScrolled", function () {
    return {

        restrict: 'A',
        link: function (scope, elem, attrs) {

            // we get a list of elements of size 1 and need the first element
            raw = elem[0];

            // we load more elements when scrolled past a limit
            elem.bind("scroll", function () {
                if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight) {
                    // we can give any function which loads more elements into the list
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    }
});