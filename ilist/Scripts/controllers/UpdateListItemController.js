(function(){
	var UpdateListItemController = function($scope, $state, dataService){
        function onUpdateCallback(response) {
            this.isError = response.isError;
            this.message = response.message;

            if (!this.isError) {
                $state.go("viewListItems");
            }
        }

        function onGetListItemCallback(response) {
            $scope.model.isError = response.isError;
            $scope.model.message = response.message;
            $scope.model.item = response.data;
            $scope.model.isLoaded = true;
        }

        function getListItem() {
            dataService.getListItem($state.params.id).then(onGetListItemCallback);
        }

        $scope.model = {
            update: function() {
                dataService.updateListItem(this.item).then(onUpdateCallback.bind(this));
            },
            isError: false,
            message: "",
            isLoaded: false
        };

        getListItem();
	};

    angular.module("iList").controller("updateListItemController", ["$scope", "$state", "dataService", UpdateListItemController]);
})();