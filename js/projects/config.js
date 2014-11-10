/**
 *  @author linbin
 *  @content seajs config file
 *  @url https://github.com/seajs/seajs/issues/262
 */

var now = new Date();

seajs.config({

	alias: {
		'jquery': 'jquery.min',
        'carousel': '../../utils/extensions/switchable/carousel',
        'utils': 'globalUtils',
        'slide': '../../utils/extensions/switchable/slide',
        'menuTree': '../../extensions/tree/menuTree',
        'tab': '../../utils/extensions/switchable/tab'
	},

	paths: {

	},

	// 变量配置
	vars: {
	  'locale': 'zh-cn'
	},
	map: [
		// 项目JS缓存刷新
        // [/^(.*\/framework\/.*\.(?:js))(?:.*)$/i, '$1?20130507'],
        [/^(.*\/extensions\/.*\.(?:js))(?:.*)$/i, 
                '$1?1111111']
        // 单独JS缓存刷新
        //['main.js', 'main.js?v=20130507']
        // 项目CSS缓存刷新(暂时没有实现)
        //[
        //    function(url) {
        //        if(url.indexOf('index.css') > 0) {
        //            url = url.replace('index.css', 'index.css?v=20130507');
        //        }
        //        return url;
        //    }
        //]
	],

    // 预加载项
    // 在老浏览器中，提前加载好 ES5 和 json 模块
    /*preload: [
        Function.prototype.bind ? '' : 'es5-safe',
	    this.JSON ? '' : 'json'
    ],*/

    // 调试模式
    debug: true,

    // Sea.js 的基础路径(ps 一般不用)
    // base: './js',

    // 文件编码
    charset: 'utf-8'
});