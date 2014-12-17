/**
 * @author jackie Lin
 * @main one piece event listener
 * @return {obj} [description]
 * @date 2014-12-15
 */
define(function(require, exports, module) {
	'use strict';
	/**
	 * [g_events, g_eventList description]
	 * @type {Array}
	 * g_events, event names
	 * g_eventList, event list(name and handler)
	 */
	var g_events = [],
		g_eventList = [],
		g_tag = 'action';

	var OpEvent = function() {
		/**
		 * all functions
		 * type: onclick or click
		 */
		var _addEvent = function(type, listener) {
			type = type.toLowerCase().replace(/^on/, '');
			if (document.addEventListener) {
				document.addEventListener(type, listener, false);
			} else if (event.attachEvent) {
				document.attachEvent('on' + type, listener);
			}
		};

		/**
		 * bind custom event simulation bubble
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		var bindEvent = function(evt) {
			_addEvent(evt, function(e) {
				// IE or other browser
				e = e || window.event;
				var target = e.target || e.srcElement,
					_bubble = true,
					_first = true,
					_action;

				while (target) {
					if (!bubble) {
						return false;
					}
					_action = target.getAttribute && target.getAttribute(tag);

					if (_action && g_eventList[_action] && g_eventList[_action][evt]) {
						_bubble = g_eventList[_action][evt].call(target, e);
					} else {
						if (_first) {
							return;
						}
					}

					target = target.parentNode;
					_first = false;
				}
			});
		};

		return {
			/**
			 * @use
			 * Opevent.bind({
	              "Div_A_Action":{
				        "click":function(e){
				            alert(e);
				        },
				        "mousemove":function(e){
				            document.title = new Date*1;
				        }
				    },
				    "Div_B_Action":{
				        "click":function(){
					        alert(this.innerHTML);
				        }
				    }
				},"myaction");
			 * @param  {[type]} map [description]
			 * @param  {[type]} tag [description]
			 * @return {[type]}     [description]
			 */
			bind: function(map, tag) {
				tag = tag || _tag;
				for (var i in map) {
					if(!g_eventList[i]) {
						g_eventList[i] = {};
					}
					for(var evt in map[i]) {
						if(!g_events[evt]) {
							g_events[evt] = true;
							bindEvent(evt);
						}
						g_eventList[i][evt] = map[i][evt];
					}
				}
			},
			/**
			 * @uses
			 * Opevent.unbind({
				    "Div_A_Action":"click",
				    "Div_B_Action":["click","mouseover"]
				});
			 * @param  {[type]} map [description]
			 * @return {[type]}     [description]
			 */
			unbind: function(map) {
				for(var i in map) {
					map[i] = typeof map[i] === 'object' ? map[i] : [map[i]];
					for(var j = 0; j < map[i].length; j++) {
						if(g_eventList[i] && g_eventList[i][map[i][j]]) {
							delete g_eventList[i][map[i][j]];
						}
					}
				}
			}
		};
	};
});