describe("Update List Item Controller", function() {
    var scope = null;
    var controller = controllerReferences["updateListItemController"];
    var mockDataService = mockDataServices["updateListItemController"];
    var state = null;

    beforeEach(function() {
        window.getListItemMockThen = function(callback) { };
        window.updateListItemMockThen = function(callback) { };

        mockDataService.getListItem = function() {
            return {
                then: window.getListItemMockThen
            }
        };

        mockDataService.updateListItem = function() {
            return {
                then: window.updateListItemMockThen
            }
        }

        state = mockStates["updateListItemController"];
        state.params = {};
        mockScopes["updateListItemController"] = {};
        scope = mockScopes["updateListItemController"];
    });

    it("should set item when getListItem callback is called", function() {
        state.params.id = "this is an id";
        spyOn(mockDataServices["updateListItemController"], "getListItem").and.callFake(function(id) {
            expect(id).toEqual("this is an id");
            return {
                then: window.getListItemMockThen
            };
        });

        spyOn(window, "getListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: "error here!",
                message: "a message",
                data: "another data thing"
            });
        });

        new controller(scope, state, mockDataService);

        expect(mockDataServices["updateListItemController"].getListItem).toHaveBeenCalled();
        expect(window.getListItemMockThen).toHaveBeenCalled();
        expect(scope.model.isError).toEqual("error here!");
        expect(scope.model.message).toEqual("a message");
        expect(scope.model.item).toEqual("another data thing");
        expect(scope.model.isLoaded).toEqual(true);
	});

	it("should NOT call updateListItem with list item if no valid text", function () {
		state.params.id = "this is an id";		

		spyOn(mockDataServices["updateListItemController"], "updateListItem").and.callThrough();

		new controller(scope, state, mockDataService);

		scope.model.item = { Text: "" };

		scope.model.update();

		expect(mockDataServices["updateListItemController"].updateListItem).not.toHaveBeenCalled();
		expect(scope.model.isError).toEqual(true);
		expect(scope.model.message).toEqual("Please enter a valid entry");
	});

    it("should call updateListItem with list item", function() {
        state.params.id = "this is an id";

        spyOn(window, "updateListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: "error here!",
                message: "a message",
                data: false
            });
		});

		spyOn(window, "getListItemMockThen").and.callFake(function (callback) {
			callback({
				isError: "error here!",
				message: "a message",
				data: "another data thing"
			});
		});

        spyOn(mockDataServices["updateListItemController"], "updateListItem").and.callFake(function(listItem) {
			expect(listItem.Text).toEqual("something");
            return {
                then: window.updateListItemMockThen
            };
        });

        new controller(scope, state, mockDataService);
		scope.model.item = {Text: "something"};
		scope.model.update();

        expect(mockDataServices["updateListItemController"].updateListItem).toHaveBeenCalled();
        expect(window.updateListItemMockThen).toHaveBeenCalled();
    });

    it("should call $state.go if not error on update", function() {
        state.params.id = "this is an id";

        spyOn(window, "updateListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: false,
                message: "a message"
            });
        });

        spyOn(state, "go").and.callFake(function(viewName) {
            expect(viewName).toEqual("viewListItems");
        });

        new controller(scope, state, mockDataService);
		scope.model.item = { Text: "stuff" };
        scope.model.update();
		
        expect(window.updateListItemMockThen).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalled();
    });

    it("should NOT call $state.go if error on update", function() {
        state.params.id = "this is an id";

        spyOn(window, "updateListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: true,
                message: "a message"
            });
        });

        spyOn(state, "go");

        new controller(scope, state, mockDataService);

		scope.model.item = { Text: "stuff" };
		scope.model.update();

        expect(window.updateListItemMockThen).toHaveBeenCalled();
        expect(state.go).not.toHaveBeenCalled();
    });
});