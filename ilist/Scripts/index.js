(function () {
	var iListApp = angular.module("iList", ["ui.router"]);

	iListApp.config(function ($stateProvider, $urlRouterProvider, $qProvider) {
		$qProvider.errorOnUnhandledRejections(false); //seems to be a weird issue with state transitions, fix later
		$urlRouterProvider.otherwise("/");
		$stateProvider.state({
			name: "listItems",
			url: "/",
			controller: "listItemsController",
			templateUrl: "/Scripts/templates/listItems.html"
		});
	});
})()