module.exports = function(config) {
	config.set({
        frameworks: ['jasmine'],
        files: [
            "./Scripts/mock/mockAngular.js",
            "./Scripts/controllers/*Controller.js",
            "./Scripts/controllers/*Controller.spec.js",
            "./Scripts/services/*Service.js",
            "./Scripts/services/*Service.spec.js"
        ],
        browsers: ["Chrome"],
        autoWatch: true
	});
};