/*! Copyright (c) 2011 Eldad Bercovici (http://viditapp.com)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.0
 * 
 * Requires: 1.2.2+
 */

function Segmentifier() {}
Segmentifier.SECONDS_PER_THUMB = 20;
Segmentifier.THUMB_WIDTH = 89;
Segmentifier.PIXELS_PER_SECOND = Segmentifier.THUMB_WIDTH / Segmentifier.SECONDS_PER_THUMB;
Segmentifier.THUMB_HEIGHT = 50;

(function($) {
	//TODO remove duplicatied consts
	
	function updateSectionDiv(section) {
		section.divThumbs.css({
			backgroundPosition: -section.start / Segmentifier.SECONDS_PER_THUMB * Segmentifier.THUMB_WIDTH + "px 0px"
		});
		
		section.div.css({
			left: section.start / Segmentifier.SECONDS_PER_THUMB * Segmentifier.THUMB_WIDTH - 5,
			width: (section.end - section.start) / Segmentifier.SECONDS_PER_THUMB * Segmentifier.THUMB_WIDTH
		});
		
		section.divDuration.text(Math.floor(section.end - section.start) + "'");
	}
	
	function createSectionDiv(section, thumbsURL) {
		section.div = $("<div>").addClass("selected-segment");
		section.divThumbs = $("<div>").addClass("selected-segment-thumbs");
		section.divDuration = $("<div>").addClass("selected-segment-duration");
		section.div.append(section.divThumbs);
		section.div.append(section.divDuration);
		section.div.append($("<div>").addClass("resize-left"));
		section.div.append($("<div>").addClass("resize-right"));
		
		section.divThumbs.css({
			backgroundImage: "url(/output/" + thumbsURL + ")"
		});
		
		section.divDuration.text(section.end - section.start + "'");
		
		updateSectionDiv(section);
		
		return section;
	}
	
	var methods = {
		getData: function () {
			return $(this).data('data');
		}, 
		
		init: function (options) {
			return this.each(function() {
				var $this = $(this);
				var data = $this.data('data');
				var sections = options.selectedSections;
				
				// If the plugin hasn't been initialized yet
				if (!data) {
					$this.addClass("segment");
					var thumbsDiv = $("<div>").addClass("bg-thumbs");
					thumbsDiv.css("background-image", "url(/output/" + options.thumbsURL + ")");
					$this.append(thumbsDiv);
					var data = { thumbsWidth: options.duration / Segmentifier.SECONDS_PER_THUMB * Segmentifier.THUMB_WIDTH };
					$.extend(data, options);
					$this.css({
						width: data.thumbsWidth,
						left: options.startTime / Segmentifier.SECONDS_PER_THUMB * Segmentifier.THUMB_WIDTH
					});
					
					$this.data('data', data);
					for (var i = 0; i < sections.length; i++) {
						var currentSection = sections[i];
						currentSection = createSectionDiv(currentSection, options.thumbsURL);
						$this.append(currentSection.div);
					}
				}
			});
		}, 
		
		destroy : function( ) {

			return this.each(function(){
				var $this = $(this);
				var data = $this.data('data');
				
				// Namespacing FTW
				$(window).unbind('.segmentify');
				$this.removeData('data');
			})
		},
	};
	
$.fn.segmentify = function (method) {
	if ( methods[method] ) {
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.segmentify' );
	}
	
	return this;
}

})(jQuery);