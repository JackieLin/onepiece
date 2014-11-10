/**
 * @author jackie Lin
 * @email dashi_lin@163.com
 * @content tab effect
 */
define(function(require, exports, module) {
	/**
	 *  all required plugins
	 */
	var Utils = require('utils'),
		$ = require('jquery');

	/**
	 *  global variables
	 */
	var g_base = {
		'element': '.ui-switchable-content',
		'triggers': '', // default ''
		'panels': '', // default ''	
		'activeIndex': 1, // default 1
		'effect': 'fade', // default fade
		'delay': 500, // trigger delay
		'_isAnimating': !1,
		'activeTriggerClass': '.ui-switchable-active', // trigger active class
		'triggerType': 'hover', // default hover and click
		'_panelStatus': 0
	};

	/**
	 *  utils single instance
	 */
	g_utils = new Utils();

	var Tab = function(obj) {
		g_base = obj ? g_utils.extendConfig(g_base, obj) : g_base;
	};

	Tab.prototype.init = function() {
		var _self = this;
		var _effect = g_base.effect;
		_self[_effect + 'Init']();
		this.animate();
	};

	/**
	 * fade init
	 * @return {[type]} [description]
	 */
	Tab.prototype.fadeInit = function() {
		var $_panel = $(g_base.panels),
			_activeIndex = g_base.activeIndex,
			_panelLength = $_panel.length,
			_panelStatus = g_base._panelStatus;

		$_panel.css('opacity', 0);
		$($_panel[_activeIndex - 1]).css('opacity', 1);

		_panelStatus = _activeIndex - 1;
	};

	Tab.prototype.animate = function() {
		var _self = this,
			$_ele = $(g_base.element),
			$_panel = $(g_base.panels),
			_panelLength = $_panel.length,
			$_triggers = $(g_base.triggers),
			_triggerType = g_base.triggerType,
			_effect = g_base.effect,
			_delay = g_base.delay,
			_isAnimating = g_base._isAnimating,
			_activeTriggerClass = g_base.activeTriggerClass;

		if ($_ele.length === 0 || _panelLength === 0) {
			g_utils.log('Tab::animate: element and panel must be exists!');
			return;
		}

		$_triggerType = (_triggerType === 'hover') ? 'mouseenter' : 'click';

		$_triggers.bind('mouseenter', function(event) {
			var $this = $(this),
				_arguments = [],
				_activeTriggerClassStr = _activeTriggerClass.match(/^[\.#](.*)/)[1];

			$_triggers.removeClass(_activeTriggerClassStr);
			$this.addClass(_activeTriggerClassStr);

			_arguments.push($this);
			_arguments.push($_panel);

			// eval function
			_self[_effect](_arguments);
		});
	};

	/**
	 * fade element used opacity
	 * @return {[type]} [description]
	 */
	Tab.prototype.fade = function() {
		var _arguments = arguments,
			$_trigger = _arguments[0][0],
			$_panel = _arguments[0][1],
			_panelStatus = g_base._panelStatus,
			_delay = g_base.delay,
			_triggerIndex = $_trigger.index();

		$($_panel[_triggerIndex]).css('opacity', 1);
		$($_panel[_panelStatus]).animate({
			'opacity': 0,
		}, _delay);
		g_base._panelStatus = _triggerIndex;
	};

	module.exports = Tab;
});