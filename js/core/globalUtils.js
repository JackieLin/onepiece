/**
 *   @author jackieLin
 *   @email dashi_lin@163.com
 *   @content The global utils
 **/
define(function (require, exports, module) {
	'use strict';
	var Utils = function() {

	};

	Utils.prototype.log = function(mess) {
		console.log = console.log || alert;
		if(!mess) {
			console.log('Utils::log: message should be exist');
		}

		console.log(mess);
	};
	/**
	 *  function: extend extend conf to base conf
	 */
	Utils.prototype.extendConfig = function(base, extend) {
		if(!base instanceof Object && !extend instanceof Object) {
			this.log('Utils::extendConfig: error: base and extend must be object base:' + base + ' extend:' + extend);
		}
		for(var i in extend) {
			if(extend.hasOwnProperty(i)) {
				base[i] = extend[i];
			}			
		}

		return base;
	};

	/**
	 * isType
	 * @param  {[type]}  obj  [description]
	 * @param  {[type]}  type [description]
	 * @uses isType([], 'Array')
	 * @return {Boolean}      [description]
	 */
	Utils.prototype.isType = function(obj, type) {
		return Object.prototype.toString.apply(obj) === '[object ' + type + ']';
	};
 
	module.exports = Utils;
});