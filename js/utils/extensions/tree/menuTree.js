/**
 * @author jackieLin
 * @email dashi_lin@163.com
 * @date 2014-11-5
 * @content menu Tree
 */
define(function(require, exports, module) {

	/**
	 * all require plugins
	 */
	var Utils = require('utils'),
		$ = require('jquery');

	/**
	 * global variables
	 */
	var g_base = {
			'element': '',
			'triggers': '',
			'panel': '',
			'leftTab': '',
			'triggerType': 'hover', // (click or hover)
			'delay': 500, // trigger delay
			'effect': 'none',
			'_initWidth': 0
		},
		/**
		 *  utils single instance
		 */
		g_utils = new Utils();

	// construct
	var MenuTree = function(obj) {
		g_base = obj ? g_utils.extendConfig(g_base, obj) : g_base;
	}

	/**
	 * [init description]
	 * @param  {Function} cb [description]
	 * @return {[type]}      [description]
	 */
	MenuTree.prototype.init = function(cb) {
		var $_ele = $(g_base.element);
		g_base._initWidth = $_ele.outerWidth(true);
		this.animation();
	};

	MenuTree.prototype.animation = function() {
		var $_ele = $(g_base.element),
			_triggerType = g_base.triggerType,
			$_triggers = $(g_base.triggers),
			$_panel = $(g_base.panel),
			_delay = g_base.delay;

		if ($_ele.length === 0 || $_triggers.length === 0) {
			g_utils.log('MenuTree::animate: element and triggers must be exists!');
			return;
		}

		// hover 
		if (_triggerType === 'hover') {
			$_triggers.bind({
				mouseenter: function() {
					var _display = $_panel.css('display'),
						_panelWidth = $_panel.outerWidth(true),
						_eleWidth = $_ele.outerWidth(true);

					// open
					if (_display === 'none') {
						$_ele.animate({
							'width': _eleWidth + _panelWidth
						}, _delay, function() {
							$_panel.css('display', 'block');
						});
					}
				},
				mouseleave: function() {

				}
			});

			$_ele.bind('mouseleave', function() {
				var _display = $_panel.css('display');
				// 收缩
				if (_display === 'block') {
					$_panel.css('display', 'none');
					$_ele.animate({
						'width': g_base._initWidth
					}, _delay);
				}
			});
		}
	};

	module.exports = MenuTree;
});