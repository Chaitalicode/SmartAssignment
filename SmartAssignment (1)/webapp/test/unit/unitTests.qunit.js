/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"SA/SmartAssignment/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
