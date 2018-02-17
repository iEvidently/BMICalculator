$(function () {

    // get current slide's number
    function currentSlide() {
        var hash = window.location.hash || '#1';
        return parseInt(hash.replace(/[A-Za-z#\-\/!]/g, '') - 1);
    }
    // global vars	
    var cycleSelector = $('.slideshow'),
			startSlide = currentSlide(),
			hasSlid = 0;

    var currslide = parseInt(startSlide) + 1;
    $("#currSlide").html(currslide);
    if (currslide == 1) {
        $("#totSlide").html(currslide);
    }
    if ($("#currSlide").text() != "" && parseInt($("#currSlide").text()) < 1) {
        var url = "/Pages/PageNotFoundError.aspx?requestUrl=" + window.location.href;
        location.href = url;
    }


    // append some markup for the controls		
    cycleSelector.before('<div id="nav"><ul/></div>')
	// start jQuery Cycle	
	.cycle({
	    startingSlide: startSlide,
	    // when using the next/prev links
	    onPrevNextEvent: function (isNext, idx, slide) {
	        hasSlid = 1;
	        $("#currSlide").html(idx + 1);
	        window.location.hash = (parseInt(idx) + 1) + "";
	        return false;
	    },
	    // when using the pager thumbnails
	    onPagerEvent: function (idx, slide) {
	        hasSlid = 1;
	        $("#currSlide").html(idx + 1);
	        window.location.hash = (parseInt(idx) + 1) + "";
	        return false;
	    },
	    timeout: 0,
	    pager: '#nav ul',
	    next: '#next',
	    prev: '#prev',
	    speed: 500,
	    // build the thumbnails
	    pagerAnchorBuilder: function (idx, slide) {

	        $("#totSlide").html(idx + 1);
	        var totNo = $("#totSlide").text();
	        /*if (totNo <= 5) {
	            return '<li><a href="' + (idx + 1) + '">' + (idx + 1) + '</a></li>';
	            return true;
	        }*/
	    }
	});

    // bind to the hashchange event
    $(window).bind('hashchange', function () {
        var slideNo = currentSlide();

        // we only want to fire the slide change if the next button or the pager hasn't done it for us
        if (hasSlid === 0) { cycleSelector.cycle(slideNo); }
        // return it back to zero
        hasSlid = 0;

        //console.log($("#currSlide").text() + ' / '+ $("#totSlide").text());
        var prevNo = $("#currSlide").text();
        var nextNo = $("#totSlide").text();
        //if url has more count thann existing slide count then redirect to 404.		
        if (parseInt($("#currSlide").text()) > parseInt($("#totSlide").text())) {
            var url = "/Pages/PageNotFoundError.aspx?requestUrl=" + window.location.href;
            location.href = url;
        }
        if (prevNo == 1) {
            $('#prev').css({ "pointer-events": "none", "cursor": "default", "opacity": "0.3" });
            $('#next').css({ "pointer-events": "auto", "cursor": "auto", "opacity": "1" });
            if (nextNo == 1) {
                $('#next').css({ "pointer-events": "none", "cursor": "default", "opacity": "0.3" });
                $('.pix-pagi').hide();
            }
        }
        else if (prevNo == nextNo) {
            $('#next').css({ "pointer-events": "none", "cursor": "default", "opacity": "0.3" });
            $('#prev').css({ "pointer-events": "auto", "cursor": "auto", "opacity": "1" });
        } else {
            $('#prev').css({ "pointer-events": "auto", "cursor": "auto", "opacity": "1" });
            $('#next').css({ "pointer-events": "auto", "cursor": "auto", "opacity": "1" });
        }

        /*if (nextNo > 5) {
            $(".slide-count").show();
            $("#wrapperslide #nav").hide();
        } else {
            $(".slide-count").hide();
            $("#wrapperslide #nav").show();
        }*/
    });

    // when the page loads, we need to trigger a hashchange
    $(window).trigger("hashchange");
});