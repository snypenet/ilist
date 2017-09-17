(function(){
    var DeleteListItemController = function($scope, $state, dataService) {
        function onDeleteCallback(response) {
            this.isError = response.isError;
            this.message = response.message;

            if (response.data) {
                $state.go("viewListItems");
            }
        }

        function onGetListItemCallback(response) {
            $scope.model.isLoaded = true;
            $scope.model.isError = response.isError;
            $scope.model.message = response.message;
            $scope.model.item = response.data;
        }

        function loadListItem() {
            dataService.getListItem($state.params.id).then(onGetListItemCallback);
        }

        $scope.model = {
            delete: function() {
                dataService.deleteListItem($state.params.id).then(onDeleteCallback.bind(this));
            },
            goBack: function() {
                $state.go("viewListItems");
            },
            isError: false,
            message: "",
			isLoaded: false
        };

        loadListItem();
	};

    angular.module("iList").controller("deleteListItemController", ["$scope", "$state", "dataService", DeleteListItemController]);
})();