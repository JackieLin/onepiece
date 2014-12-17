/**
 * @author jackie Lin
 * @email dashi_lin@163.com
 * @content validate input message
 */
define(function (require, exports, module) {
	/**
	 * all required plugins
	 */
	 var Utils = require('utils'),	 
	 	 $ = require('jquery');

	 var g_regex = {
	 	'email': //,
	 	'phone': //,
	 	'idCard': //
	 }

	var g_utils = new Utils();

	var Validate = function(obj) {
		g_regex = obj ? g_utils.extendConfig(g_regex, obj) : g_regex;
	};

	Validate.prototype.init = function() {
		
	};
});