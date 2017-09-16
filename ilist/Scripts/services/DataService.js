(function(){
	var DataService = function ($http) {
		var baseUrl = "/api/";
		var listItemsUrl = baseUrl + "listItem";

		function onErrorCallback(errorResponse) {
			return {
				isError: true, 
				message: errorResponse.data.Message
			}
        }

        function onSuccessCallback(successResponse) {
            return {
                isError: successResponse.data.IsError,
                message: successResponse.data.Message,
                data: successResponse.data
            }
        }

        function getListItems() {
            return $http.get(listItemsUrl).then(function(successResponse) {
                var response = onSuccessCallback(successResponse);
                response.data = response.data.Items;
                return response;
            }, onErrorCallback);
        }

        function getListItem(id) {
            return $http.get(listItemsUrl + "/" + id).then(function(successResponse) {
                var response = onSuccessCallback(successResponse);
                response.data = response.data.Item;
                return response;
            }, onErrorCallback);
        }

        function updateListItem(listItem) {
            $http.put(listItemsUrl, { id: listItem.id, text: listItem.text }).then(function(successResponse) {
                var response = onSuccessCallback(successResponse);
                response.data = response.data.Item;
                return response;
            }, onErrorCallback);
        }

        function insertListItem(text) {
            return $http.post(listItemsUrl, { text: text }).then(function(successResponse) {
                var response = onSuccessCallback(successResponse);
                response.data = response.data.Item;
                return response;
            }, onErrorCallback);
        }

        function deleteListItem(id) {
            return $http.delete(listItemsUrl + "/" + id).then(function(successResponse) {
                var response = onSuccessCallback(successResponse);
                response.data = response.data.IsSuccess;
                return response;
            }, onErrorCallback);
        }

        return {
            getListItems: getListItems,
            updateListItem: updateListItem,
            insertListItem: insertListItem,
            deleteListItem: deleteListItem,
            getListItem: getListItem
        };
	};

	angular.module("iList").factory("dataService", ["$http", DataService]);
})()