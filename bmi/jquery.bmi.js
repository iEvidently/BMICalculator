$(function(){
	$('.calc-frame .row input').keyup(function(e){
		if(e.keyCode == 13){
			$(this).closest('.text-box').find('.btn-next').trigger("click");
		}
	});
	
	$('.calc-frame .row input').bind("change keyup input click", function(){
		if(this.value.match(/[^\d\.]/g)) {
			this.value = this.value.replace(/[^\d\.]/g, '');
		}
	});
	
	$('.btn-next').click(function(){
		if($(this).hasClass('back')){
			$(this).closest('.box').hide();
			$('.calc-frame .row input').val('');
			$('#box01').fadeIn(350);
		}
		else if($(this).hasClass('calculate')){
			var height_ = $(this).closest('.calc-frame').find('.row input').val();
			//var filter = /[^\d\.]/g;
			
			if(height_ == '' || height_ == 0){
				$(this).closest('.calc-frame').find('.error-txt').animate({
					opacity: 1
				},300);
			}
			else{
				$(this).closest('.calc-frame').find('.error-txt').css('opacity', '0');
				$(this).closest('.box').hide();
				$(this).closest('.box').next().fadeIn(350);
				var weight_ = $('#box01 .row input').val();
				var bmi_ = (weight_/((height_/100)*(height_/100))).toFixed(1);
				
				if(bmi_ < 18.5){
					$('.result-area-holder #result01').show();
					$('.result-area-holder #result01').siblings().hide();
					$('.result-area-holder #result01 .top-lst-calc .final-bmi').html(bmi_);
				}
				else if(bmi_ >= 18.5 && bmi_ <= 23){
					$('.result-area-holder #result02').show();
					$('.result-area-holder #result02').siblings().hide();
					$('.result-area-holder #result02 .top-lst-calc .final-bmi').html(bmi_);
				}
				else if(bmi_ >= 23 && bmi_ <= 27.5){
					$('.result-area-holder #result03').show();
					$('.result-area-holder #result03').siblings().hide();
					$('.result-area-holder #result03 .top-lst-calc .final-bmi').html(bmi_);
				}
				else if(bmi_ >= 27.5){
					$('.result-area-holder #result04').show();
					$('.result-area-holder #result04').siblings().hide();
					$('.result-area-holder #result04 .top-lst-calc .final-bmi').html(bmi_);
				}
			}
		}
		else{
			var val_ = $(this).closest('.calc-frame').find('.row input').val();
			if(val_ == '' || val_ == 0){
				$(this).closest('.calc-frame').find('.error-txt').animate({
					opacity: 1
				},300);
			}
			else{
				$(this).closest('.calc-frame').find('.error-txt').css('opacity', '0')
				$(this).closest('.box').hide();
				$(this).closest('.box').next().fadeIn(350);
			}
		}
		
		return false;
	});
});

$(window).load(function(){	
	if($('.result-area-calc').length){
		$('.result-area-calc').sameHeight({
			elements: '> div',
			flexible: true,
			multiLine: true,
			useMinHeight: true
		});
	}
});

/*
 * jQuery SameHeight plugin
 */
;(function(jQuery){
	jQuery.fn.sameHeight = function(opt) {
		var options = jQuery.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false,
			biggestHeight: false
		},opt);
		return this.each(function(){
			var holder = jQuery(this), postResizeTimer, ignoreResize;
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;

			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();

			// handle flexible layout / font resize
			var delayedResizeHandler = function() {
				if(!ignoreResize) {
					ignoreResize = true;
					doResize();
					clearTimeout(postResizeTimer);
					postResizeTimer = setTimeout(function() {
						doResize();
						setTimeout(function(){
							ignoreResize = false;
						}, 10);
					}, 100);
				}
			};

			// handle flexible/responsive layout
			if(options.flexible) {
				jQuery(window).bind('resize orientationchange fontresize refreshOnOpen', delayedResizeHandler);
			}

			// handle complete page load including images and fonts
			jQuery(window).bind('load', delayedResizeHandler);
		});
	};

	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = jQuery(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = jQuery(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
		}
		if(options.biggestHeight) {
			boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
		}
	}

	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, jQuery(this).outerHeight());
		});
		return maxHeight;
	}

	// resize helper function
	function resizeElements(boxes, parent, options) {
		var calcHeight;
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = jQuery(this);
			var depthDiffHeight = 0;
			var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = jQuery(this);
					if(parent.is(this)) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			calcHeight = parentHeight - depthDiffHeight;
			calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
		return calcHeight;
	}
}(jQuery));