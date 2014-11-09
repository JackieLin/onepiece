define(function(require, exports, module) {
	var $ = require('jquery');
	// 获取数据
	$.getScript('menu.js', function() {
		
	});

	var MenuTree = require('menuTree');
	menuTree = new MenuTree({
		'element': '#nav_browse_flyout',
		'triggers': '#nav_cats .nav_pop_li',
		'panel': '#nav_subcats',
		'leftTab': '#nav_cats_wrap'
	});
	menuTree.init();

});