define(function(require, exports, module) {
	var $ = require('jquery');
	
	var Carousel = {

		set: function(rate) {

			var that = this;

			$('.J_carousel').each(function() {

				var $screen = $(this).find('.J_screen'),
					$film = $(this).find('.J_film'),
					$lens = $film.children(),
					$prev = $(this).find('.J_prev'),
					$next = $(this).find('.J_next'),
					$page = $(this).find('.J_page'),
					$pagination = $page.children(),
					time = 0;

				if ($(this).is('.S_carouselY')) {
					var screenSize = $screen.height(),
						footage = $lens.outerHeight(true) * $lens.size(),
						maxTime = Math.ceil(footage / screenSize) - 1,
						y = true;

					$film.height(100000);
				} else {
					var screenSize = $screen.width(),
						footage = $lens.outerWidth(true) * $lens.size(),
						maxTime = Math.ceil(footage / screenSize) - 1;

					$film.width(100000);
				}

				$pagination.filter(':first').addClass('S_current');

				$prev.click(function() {

					var $prev = $pagination.filter('.S_current').prev(),
						$selected = ($prev.length) ? $prev : $pagination.filter(':last');

					time--;
					if (time < 0) time = maxTime;

					that.transition(screenSize, time, $film, $selected, y, rate);
				})

				$next.click(function() {

					var $next = $pagination.filter('.S_current').next(),
						$selected = ($next.length) ? $next : $pagination.filter(':first');

					time++;
					if (time > maxTime) time = 0;

					that.transition(screenSize, time, $film, $selected, y, rate);
				})

				$pagination.click(function() {

					var $selected = $(this);

					time = $(this).index();
					that.transition(screenSize, time, $film, $selected, y, rate);
				})
			})
		},

		transition: function(screenSize, time, $film, $selected, y, rate) {

			var distance = -screenSize * time;

			if (!rate) {
				var rate = 'normal';
			}

			if (y) {
				$film.animate({
					'margin-top': distance
				}, rate);
			} else {
				$film.animate({
					'margin-left': distance
				}, rate);
			}

			$selected.addClass('S_current').siblings().removeClass('S_current');
		}
	};

	module.exports = Carousel;
});