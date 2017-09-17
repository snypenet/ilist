(function() {
    var NewListItemController = function($scope, $state, dataService) {
        function onSaveCallback(response) {
            this.isError = response.isError;
            this.message = response.message;

            if (!this.isError) {
                $state.go("viewListItems");
            }
        }
		
        $scope.model = {
            save: function() {
                if (!this.text) {
                    this.isError = true;
                    this.message = "Please enter something valid";
                } else {
                    this.isError = false;
                    this.message = "";
                    dataService.insertListItem(this.text).then(onSaveCallback.bind(this));
                }
            },
            text: "",
            isError: false,
			message: ""
        }; 
		
    };

    angular.module("iList").controller("newListItemController", ["$scope", "$state", "dataService", NewListItemController]);
})()