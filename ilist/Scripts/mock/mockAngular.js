var controllerReferences = {};
var factoryReferences = {};
var mockScopes = {};
var mockDataServices = {};
var mockStates = {};

var angular = {
    module: function(moduleName) {
        return {
            controller: function(controllerName, configs) {
                if (configs.length != undefined) {
                    controllerReferences[controllerName] = configs[configs.length - 1];
                } else {
                    controllerReferences[controllerName] = configs;
                }
                mockScopes[controllerName] = {};
                mockStates[controllerName] = { go: function() { } };
                mockDataServices[controllerName] = {};
            },
            factory: function(factoryName, configs) {
                if (configs.length != undefined) {
                    factoryReferences[factoryName] = configs[configs.length - 1];
                } else {
                    factoryReferences[factoryName] = configs;
                }
                mockScopes[factoryName] = {};
                mockStates[factoryName] = { go: function() { } };
                mockDataServices[factoryName] = {};
            }
        };
    }
};