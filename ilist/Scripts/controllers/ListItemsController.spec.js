describe("List Items Controller", function() {
    var scope = null;
    var controller = controllerReferences["listItemsController"];
    var mockDataService = mockDataServices["listItemsController"];

    beforeEach(function() {
        window.listItemsMockThen = function(callback) {

        };

        mockDataService.getListItems = function() {
            return {
                then: window.listItemsMockThen
            }
        };

        mockScopes["listItemsController"] = {};
        scope = mockScopes["listItemsController"];
    });

    it("should set a base model object on scope with save function, isError property, text property, message property", function() {
        new controller(scope, mockDataService);

        expect(typeof scope).toEqual("object");
    });

    it ("should set listItems property, isError property and message property on scope model when getListItemsCallback is called", function() {
        spyOn(window, "listItemsMockThen").and.callFake(function(callback) {
            callback({
                isError: "of course",
                message: "I'm not a real message",
				data: "I'm what you are asking for"
            });
        });

        expect(scope.model).toEqual(undefined);

        new controller(scope, mockDataService);
		
        expect(scope.model.isError).toEqual("of course");
        expect(scope.model.message).toEqual("I'm not a real message");
        expect(scope.model.listItems).toEqual("I'm what you are asking for");
    });
});