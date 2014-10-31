/**
 *  @author jackieLin
 *  @email dashi_lin@163.com
 *  @content slide effect
 */
define(function (require, exports, module) {
	/**
	 *   all required plugins
	 */
	var Utils = require('utils'),
		$ = require('jquery');

	/**
	 *  global variables
	 */
	var g_base = {
		'element': '.ui-switchable-content',
		'type': 'marquee', 								// type, default marquee
		'triggers': '',
		'panel': '.ui-switchable-content .ui-switchable-panel',
		'activeIndex': 1,
		'triggerType': 'click',  						// (click or hover)
		'delay': 100,            						// trigger delay
		'activeTriggerClass': 'ui-switchable-active', 	// trigger active class
		'step': 1,										// trigger some panels
		'viewSize': 1,									// default: []
		'autoplay': false,
		'interval': 3000,								// auto play time
		'circular': true,								// circle or not
		'duration': 500,								// animtion time
		'effect': 'none'
	},

	/**
	 *  utils single instance
	 */
	g_utils = new Utils();


	var Slide = function (obj) {
		g_base = obj ? g_utils.extendConfig(g_base, obj) : g_base;

	}

	Slide.prototype.init = function() {
		var _viewsize = g_base.viewSize,
			_ele = g_base.element,
			_panel = g_base.panel,
			$_ele = $(_ele),
			$_panel = $(_panel),
			_panelLength = $_panel.length;

		if($_ele.length === 0 || _panelLength === 0) {
			g_utils.log('Slide::init: element and panel must be exists!');
			return;
		}
		
		
	};

	module.exports = Slide;
});