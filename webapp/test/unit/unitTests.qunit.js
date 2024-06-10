/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comibspl/shpping_cart/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
