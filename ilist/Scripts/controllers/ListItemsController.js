(function () {
    var ListItemsController = function($scope, dataService) {
        $scope.model = {};

        function onLoadListItemsCallback(response) {
            $scope.model.isError = response.isError;
            $scope.model.message = response.message;
            $scope.model.listItems = response.data;
        }

        function loadListItems() {
            dataService.getListItems().then(onLoadListItemsCallback);
        }

        loadListItems();
	};

	angular.module("iList").controller("listItemsController", ["$scope", "dataService", ListItemsController]);
})()