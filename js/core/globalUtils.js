/**
 *   @author jackieLin
 *   @email dashi_lin@163.com
 *   @content The global utils
 **/
define(function (require, exports, module) {
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
		if(!base instanceof Obeject && !extend instanceof Obeject) {
			this.log('Utils::extendConfig: error: base and extend must be object base:' + base + ' extend:' + extend);
		}
		for(var i in extend) {
			if(extend.hasOwnProperty(i)) {
				base[i] = extend[i];
			}			
		}

		return base;
	};
 
	module.exports = Utils;
});