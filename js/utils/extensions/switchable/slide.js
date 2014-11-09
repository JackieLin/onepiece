/**
 *  @author jackieLin
 *  @email dashi_lin@163.com
 *  @content slide effect
 *  @ignore rebuild according game
 */
define(function(require, exports, module) {
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
			'triggers': [],
			'panel': '.ui-switchable-content .ui-switchable-panel',
			'activeIndex': 1,
			'triggerType': 'click', // (click or hover)
			'delay': 500, // trigger delay
			'activeTriggerClass': '.ui-switchable-active', // trigger active class
			'step': 1, // trigger some panels
			'viewSize': 3, // default: []  
			'autoplay': false,
			'interval': 3000, // auto play time
			'circular': true, // circle or not
			'duration': 2000, // animtion time
			'effect': 'none',
			'_isAnimating': !1,
			'_direction': 'right',
			'_panelLength': 0                     			// init marquee length
		},

		/**
		 *  utils single instance
		 */
		g_utils = new Utils();


	var Slide = function(obj) {
		g_base = obj ? g_utils.extendConfig(g_base, obj) : g_base;
	}

	Slide.prototype.init = function() {
		this.animate();
		this.trigger();
	};

	/**
	 *   function: To do the basic animate
	 */
	Slide.prototype.animate = function(first_argument) {
		var that = this,
			_viewsize = g_base.viewSize,
			_ele = g_base.element,
			_panel = g_base.panel,
			_triggerType = g_base.triggerType,
			_triggers = g_base.triggers,
			$_allTriggers = [],
			$_ele = $(_ele),
			$_panel = $(_panel),
			$firstEle,
			$lastEle,
			_panelLength = $_panel.length,
			_panelSize = $_panel.outerWidth(true) * _panelLength,
			extendLength;

		if ($_ele.length === 0 || _panelLength === 0) {
			g_utils.log('Slide::animate: element and panel must be exists!');
			return;
		}

		// set _panelLength
		g_base._panelLength = _panelLength;

		extendLength = _viewsize;

		$firstEle = $_panel.slice(0, extendLength);
		$lastEle = $_panel.slice(_panelLength - extendLength, _panelLength);

		// copy element to distance
		this.copyEle($firstEle, $_ele, 'appendTo');
		this.copyEle($lastEle, $_ele, 'prependTo');

		// init margin left
		$_ele.css('margin-left', -extendLength * $_panel.outerWidth(true));

		// store all trigger
		for (var i = 0; t = _triggers[i]; i++) {
			$_allTriggers.push($(t));
		}

		that.funtimeout = window.setTimeout(function() {
			if(!g_base._isAnimating) {
				that.transition();
			}
			that.funtimeout = window.setTimeout(arguments.callee, g_base.duration);	
		}, g_base.duration);
	};

	/**
	 * function: To do trigger
	 */
	Slide.prototype.trigger = function() {
		var that = this,
			_triggers = g_base.triggers,
			_triggerType = g_base.triggerType,
			_activeTriggerClass = g_base.activeTriggerClass,
			$_ele = $(g_base.element),
			$_allTriggers = [],
			$_activeTrigger = $(_activeTriggerClass),
			$_panel = $(g_base.panel),
			_panelWidth = $_panel.outerWidth(true),
			_viewsize = g_base.viewSize,
			_viewWidth = _panelWidth * _viewsize,
			_delay = g_base.delay,
			sToNum = /\-?\d+\.?(\d+)?/,
			left, marginLeft;

		// store all trigger
		for (var i = 0; t = _triggers[i]; i++) {
			$_allTriggers.push($(t));
		}

		left = parseFloat($_activeTrigger.css('left').match(sToNum)[0]);
		// binging events
		// prev
		$_allTriggers[0].bind(_triggerType, function() {
			if (!g_base._isAnimating) {
				if (left <= 0) {
					g_base._direction = 'left';
					// move to next
					that.transition();
				} else {
					// running
					g_base._isAnimating = !0;
					left -= _panelWidth;
					$_activeTrigger.animate({
						'left': left
					}, _delay, function() {
						g_base._isAnimating = !1;
					});
				}
			}
		});
		// next
		$_allTriggers[1].bind(_triggerType, function() {
			if (!g_base._isAnimating) {
				if (left >= _viewWidth - _panelWidth) {
					g_base._direction = 'right';
					// move to next
					that.transition();
				} else {
					// running
					g_base._isAnimating = !0;
					left += _panelWidth;
					$_activeTrigger.animate({
						'left': left
					}, _delay, function() {
						g_base._isAnimating = !1;
					});
				}
			}
		});
	};
	/**
	 *   function: copy source ele to distance
	 */
	Slide.prototype.copyEle = function($source, $distance, type) {
		if (!$source instanceof jQuery && !$distance instanceof jQuery) {
			g_utils.log('Slide:: copyEle: $source and $distance must be exists');
			return;
		}

		var $source_copy = $source.clone();

		if (type === 'prependTo') {
			$source_copy.prependTo($distance);
		} else if (type === 'appendTo') {
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
			_direction = g_base._direction,
			_panelWidth = $_panel.outerWidth(true),
			_eleWidth = _panelWidth * $_panel.length,
			_viewsize = g_base.viewSize,
			marginLeft, marginLeftP, rate
		sToNum = /\-?\d+\.?(\d+)?/,
		_delay = g_base.delay;

		// current animate is running
		g_base._isAnimating = !0;

		// calculate margin left
		marginLeft = parseFloat($_ele.css('margin-left').match(sToNum)[0]) || 0;
		marginLeftP = Math.abs(marginLeft);

		rate = (_direction === 'right') ? (_eleWidth - marginLeftP - _panelWidth * _viewsize) / _panelWidth - _step : marginLeftP / _panelWidth - _step;

		// normal margin left
		if (rate >= 0) {
			marginLeft = (_direction === 'right') ? (marginLeft - _panelWidth * _step)
							:  (marginLeft + _panelWidth * _step);
			$_ele.animate({
				'margin-left': marginLeft
			}, _delay, function() {
				// finish animate
				g_base._isAnimating = !1;
				callback || '';
			});
		} else {
			// rule
			/**
			 * 原理
			 * @type {[type]}
			 * 三个元素影响： 1. step 2. viewsize 3. 最后剩下多少个
			 * 根据这三个元素，穷举可能的情况，得出规律
			 */
			rate =  (_direction === 'right') ? (rate + _step - _viewsize)
						: -(rate + _step + g_base._panelLength);
			// init
			$_ele.css('margin-left', rate * _panelWidth);
			marginLeft = (_direction === 'right') ? (rate * _panelWidth - _panelWidth * _step)
							: (rate * _panelWidth + _panelWidth * _step);
			$_ele.animate({
				'margin-left': marginLeft
			}, _delay, function() {
				// finish animate
				g_base._isAnimating = !1;
				callback || '';
			});
		}

	};

	module.exports = Slide;
});