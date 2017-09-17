describe("Delete List Item Controller", function() {
    var scope = null;
    var controller = controllerReferences["deleteListItemController"];
    var mockDataService = mockDataServices["deleteListItemController"];
    var state = null;

    beforeEach(function() {
        window.getListItemMockThen = function(callback) { };
        window.deleteListItemMockThen = function(callback) { };

        mockDataService.getListItem = function() {
            return {
                then: window.deleteListItemMockThen
            }
        };

        mockDataService.deleteListItem = function() {
            return {
                then: window.deleteListItemMockThen
            }
        }

        state = mockStates["deleteListItemController"];
        state.params = {};
        mockScopes["deleteListItemController"] = {};
        scope = mockScopes["deleteListItemController"];
    });

    it("should set item when getListItem callback is called", function() {
        state.params.id = "this is an id";
        spyOn(mockDataServices["deleteListItemController"], "getListItem").and.callFake(function(id) {
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

        expect(mockDataServices["deleteListItemController"].getListItem).toHaveBeenCalled();
        expect(window.getListItemMockThen).toHaveBeenCalled();
        expect(scope.model.isError).toEqual("error here!");
        expect(scope.model.message).toEqual("a message");
        expect(scope.model.item).toEqual("another data thing");
        expect(scope.model.isLoaded).toEqual(true);
    });

    it("should call deleteListItem with list item", function() {
        state.params.id = "this is an id";

        spyOn(window, "deleteListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: "error here!",
                message: "a message",
                data: false
            });
        });

        spyOn(mockDataServices["deleteListItemController"], "deleteListItem").and.callFake(function(listItem) {
            expect(listItem).toEqual("this is an id");
            return {
                then: window.deleteListItemMockThen
            };
        });

        new controller(scope, state, mockDataService);

        scope.model.delete();

        expect(mockDataServices["deleteListItemController"].deleteListItem).toHaveBeenCalled();
        expect(window.deleteListItemMockThen).toHaveBeenCalled();
    });

    it("should call $state.go if successful on delete", function() {
        state.params.id = "this is an id";

        spyOn(window, "deleteListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: "error here!",
                message: "a message",
                data: true
            });
        });

        spyOn(state, "go").and.callFake(function(viewName) {
            expect(viewName).toEqual("viewListItems");
        });

        new controller(scope, state, mockDataService);

        scope.model.delete();
		
        expect(window.deleteListItemMockThen).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalled();
    });

    it("should NOT call $state.go if not successful on delete", function() {
        state.params.id = "this is an id";

        spyOn(window, "deleteListItemMockThen").and.callFake(function(callback) {
            callback({
                isError: "error here!",
                message: "a message",
                data: false
            });
        });

        spyOn(state, "go");

        new controller(scope, state, mockDataService);

        scope.model.delete();

        expect(window.deleteListItemMockThen).toHaveBeenCalled();
        expect(state.go).not.toHaveBeenCalled();
    });
});