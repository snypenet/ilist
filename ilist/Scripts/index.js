(function () {
	var iListApp = angular.module("iList", ["ui.router"]);

	iListApp.config(function ($stateProvider, $urlRouterProvider, $qProvider) {
		$qProvider.errorOnUnhandledRejections(false); //seems to be a weird issue with state transitions, fix later
		$urlRouterProvider.otherwise("/");
		$stateProvider.state({
			name: "viewListItems",
			url: "/",
			controller: "listItemsController",
			templateUrl: "/Scripts/templates/listItems.html"
        });

        $stateProvider.state({
            name: "addListItem",
            url: "/item/new",
            controller: "newListItemController",
            templateUrl: "/Scripts/templates/newListItem.html"
        });

        $stateProvider.state({
            name: "deleteListItem",
            url: "/item/delete/:id",
            controller: "deleteListItemController",
            templateUrl: "/Scripts/templates/deleteListItem.html"
        });

        $stateProvider.state({
            name: "updateListItem",
            url: "/item/update/:id",
            controller: "updateListItemController",
            templateUrl: "/Scripts/templates/updateListItem.html"
        });
	});
})()