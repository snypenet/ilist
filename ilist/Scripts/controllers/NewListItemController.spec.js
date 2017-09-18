describe("New List Item Controller", function () {
	var scope = null;
	var controller = controllerReferences["newListItemController"];
	var mockDataService = mockDataServices["newListItemController"];
	var state = null;

	beforeEach(function () {
		window.newlistItemMockThen = function (callback) {

		};

		mockDataService.insertListItem = function () {
			return {
				then: window.newlistItemMockThen
			}
		};

		state = mockStates["deleteListItemController"];
		mockScopes["newListItemController"] = {};
		scope = mockScopes["newListItemController"];
	});

	it("model is created on scope correctly", function () {
		new controller(scope, state, mockDataService);

		expect(typeof scope.model.save).toEqual("function");
		expect(scope.model.text).toEqual("");
		expect(scope.model.isError).toEqual(false);
		expect(scope.model.message).toEqual("");
	});

	it("insertListItem is not called if no text is entered", function () {
		spyOn(mockDataServices["newListItemController"], "insertListItem");

		new controller(scope, state, mockDataService);

		scope.model.save();
		expect(mockDataServices["newListItemController"].insertListItem).not.toHaveBeenCalled(); 
		expect(scope.model.isError).toEqual(true);
		expect(scope.model.message).toEqual("Please enter something valid");
	});

	it("insertListItem called when there is text", function () {
		spyOn(mockDataServices["newListItemController"], "insertListItem").and.callThrough();

		new controller(scope, state, mockDataService);
		scope.model.text = "something";
		scope.model.save();
		expect(mockDataServices["newListItemController"].insertListItem).toHaveBeenCalled();
		expect(scope.model.isError).toEqual(false);
		expect(scope.model.message).toBeFalsy();
	});

	it("onSaveCallback calls state.go when there is not an error", function () {
		spyOn(window, "newlistItemMockThen").and.callFake(function (callback) {
			callback({
				isError: false,
				message: "a message"
			});
		});

		spyOn(mockStates["deleteListItemController"], "go").and.callFake(function (viewName) {
			expect(viewName).toEqual("viewListItems");
		});

		new controller(scope, state, mockDataService);

		scope.model.text = "something";
		scope.model.save();

		expect(window.newlistItemMockThen).toHaveBeenCalled();
		expect(mockStates["deleteListItemController"].go).toHaveBeenCalled();
		expect(scope.model.isError).toEqual(false);
		expect(scope.model.message).toEqual("a message");
	});

	it("onSaveCallback does not call state.go when there is an error", function () {
		spyOn(window, "newlistItemMockThen").and.callFake(function (callback) {
			callback({
				isError: true,
				message: "a message"
			});
		});

		spyOn(mockStates["deleteListItemController"], "go");

		new controller(scope, state, mockDataService);

		scope.model.text = "something";
		scope.model.save();

		expect(mockStates["deleteListItemController"].go).not.toHaveBeenCalled();
		expect(scope.model.isError).toEqual(true);
		expect(scope.model.message).toEqual("a message");
	});
});