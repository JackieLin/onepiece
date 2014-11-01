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
		'triggers': '',
		'panel': '.ui-switchable-content .ui-switchable-panel',
		'activeIndex': 1,
		'triggerType': 'click',  						// (click or hover)
		'delay': 500,            						// trigger delay
		'activeTriggerClass': 'ui-switchable-active', 	// trigger active class
		'step': 1,										// trigger some panels
		'viewSize': 3,									// default: []
		'autoplay': false,
		'interval': 3000,								// auto play time
		'circular': true,								// circle or not
		'duration': 2000,								// animtion time
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
		var that = this,
			_viewsize = g_base.viewSize,
			_ele = g_base.element,
			_panel = g_base.panel,
			$_ele = $(_ele),
			$_panel = $(_panel),
			$firstEle,
			$lastEle,
			_panelLength = $_panel.length,
			_panelSize = $_panel.outerWidth(true) * _panelLength,
			extendLength;

		if($_ele.length === 0 || _panelLength === 0) {
			g_utils.log('Slide::init: element and panel must be exists!');
			return;
		}
		extendLength = parseInt(_viewsize - 1);

		$firstEle = $_panel.slice(0, extendLength);
		$lastEle = $_panel.slice(_panelLength - extendLength, _panelLength);

		// copy element to distance
		this.copyEle($firstEle, $_ele, 'appendTo');
		this.copyEle($lastEle, $_ele, 'prependTo');

		// init margin left
		$_ele.css('margin-left', -extendLength * $_panel.outerWidth(true));

		window.setTimeout(function() {
			that.transition();
			window.setTimeout(arguments.callee, g_base.duration);
		}, g_base.duration);
	};

	/**
	 *   function: copy source ele to distance
	 */
	Slide.prototype.copyEle = function($source, $distance, type) {
		if(!$source instanceof jQuery && !$distance instanceof jQuery) {
			g_utils.log('Slide:: copyEle: $source and $distance must be exists');
			return;
		}

		var $source_copy = $source.clone();

		if(type === 'prependTo') {
			$source_copy.prependTo($distance);
		} else if(type === 'appendTo') {
			$source_copy.appendTo($distance);
		}
	};

	/**
	 *  function: transition the element
	 */
	Slide.prototype.transition = function(callback) {
		var _step = g_base.step,
			$_ele = $(g_base.element),
			$_panel = $(g_base.panel),
			_panelWidth = $_panel.outerWidth(true),
			_eleWidth = _panelWidth * $_panel.length,
			_viewsize = g_base.viewSize,
			marginLeft, marginLeftP, rate
			sToNum = /\-?\d+\.?(\d+)?/,
			_delay = g_base.delay;

		// calculate margin left
		marginLeft = parseFloat($_ele.css('margin-left').match(sToNum)[0]) | 0;
		marginLeftP = Math.abs(marginLeft);

		rate = (_eleWidth - marginLeftP) / (_panelWidth * _step) - _viewsize + 1;

		// normal margin left
		if(rate > 1) {
			marginLeft = marginLeft - _panelWidth * _step;
			$_ele.animate({
				'margin-left': marginLeft
			}, _delay);
		} else {
			// init
			$_ele.css('margin-left', (rate - 2) * _panelWidth);
			marginLeft =  (rate - 2) * _panelWidth - _panelWidth * _step;
			$_ele.animate({
				'margin-left': marginLeft
			}, _delay);
		}

	};
	
	module.exports = Slide;
});