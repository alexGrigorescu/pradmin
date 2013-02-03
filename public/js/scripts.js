var timeStart;
var timeoutInterval = 30000;
var numAdds = 3;
var el = 2

$(window).load(function() {
	timeStart = Math.round((new Date()).getTime() / 1000);
	$messages = $("#messages");
	//if there are messages to display, show the div
	if ($messages.html() && $messages.html().length > 0)
		$messages.show();
	
	//center messages div
    $messages.css("left", (($(window).width() -  $messages.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    $messages.delay(10000).fadeOut("slow");
});

// returns the first form that contains element, on the path to the root 
function getEmbeddingForm(element) {
	var node = element.parent();
	while (node && !node.is("form")) {
		node = node.parent();
	}
	return node;
}

// default action for submit buttons
$(".submit").live("click",function(){
	var form = getEmbeddingForm($(this));
	if(validate(form))
		form.submit();
});

//submit form on keypress enter
$('input').live("keypress", function(e) {
    if(e.which == 13) {
		if($(this).attr("name") == "username" || $(this).attr("name") == "password"){
			$(this).blur();
			var form = getEmbeddingForm($('.submit'));
			if(validate(form))
				form.submit();
		}else{
			return false;
		}
    }
});


$(document).ready(function() {
	
	
	//for the header login panel
	// Expand Panel
	$("#open").click(function(){
		$("div#panel").slideDown("slow");
		this.className = "display-none";
		document.getElementById("close").className = "close";
	
	});	
	
	// Collapse Panel
	$("#close").click(function(){
		$("div#panel").slideUp("slow");	
		this.className = "display-none";
		document.getElementById("open").className = "open";
	});	
	var addsBox = $(".adds-box");
	numAdds = addsBox.children("a").length;
	if(addsBox.html()){
		$(".adds-box a:eq("+el+")").hide();
		setTimeout( function()
		{
			shuffleAdds(addsBox);
		}, timeoutInterval);
	}
	
	
	
	// ckeditor cluetip fix
	$("#we_offer-element").live('mouseenter', function(){
		$(".ui-tooltip").remove();
		$(".cke_contents iframe").attr('title', $('#we_offer').attr('title'));
	});
	
	$("#cke_we_need").live('mouseenter', function(){
		$(".ui-tooltip").remove();
		$(".cke_contents iframe").attr('title', $('#we_need').attr('title'));
	});
	
	$("#cke_description").live('mouseenter', function(){
		$(".ui-tooltip").remove();
		$(".cke_contents iframe").attr('title', $('#description').attr('title'));
	});
});

function shuffleAdds(addsBox){
	var old_el;
	old_el = el;
	el = Math.floor(Math.random()*numAdds);
	
	if(old_el == el){
		shuffleAdds(addsBox);
		return;
	}
	addsBox.fadeOut("normal", function(){
		addsBox.children("a").show();
		$(".adds-box a:eq("+el+")").hide();
	});
	addsBox.fadeIn();
	setTimeout( function()
	{
		shuffleAdds(addsBox);
	}, timeoutInterval);
}


function slide( type, id_show, id_on, id_off )
{
	$('#' + id_show).slideToggle('slow');
	if( type == "on" )
	{
		$('#' + id_on).hide();
		$('#' + id_off).show();
	}
	else
	{
		$('#' + id_on).show();
		$('#' + id_off).hide();
	}
} 

$(window).unload(function() {
	var spentTime = Math.round((new Date()).getTime() / 1000) - timeStart;
	// if the time spent on page is more than 10 sec, log the visit
	//if(spentTime > 10){
		$.ajax({
		  url: baseUrl+"/index/time",
		  type: 'post',
		  data: 'spentTime=' + spentTime + '&url='+location.href,
		  success: function(data){
		  	console.log( 'Time spent: ', data );
		  }
		});
	//}
});


/*
 * stickyfloat - jQuery plugin for verticaly floating anything in a constrained area
 * 
 * Example: jQuery('#menu').stickyfloat({duration: 400});
 * parameters:
 * 		duration 	(200)	 - the duration of the animation
 *		startOffset (number) - the amount of scroll offset after the animations kicks in
 *		offsetY		(number) - the offset from the top when the object is animated
 *		lockBottom	(true)	 - set to false if you don't want your floating box to stop at parent's bottom
 *		delay		(0)		 - delay in milliseconds  until the animnations starts
		easing		(linear) - easing function (jQuery has by default only 'swing' & 'linear')
 * $Version: 08.10.2011 r2
 * $Version: 05.16.2009 r1
 * Copyright (c) 2009 Yair Even-Or
 * vsync.design@gmail.com
 */
(function($){
	$.fn.stickyfloat = function(options, lockBottom){
		var $obj 				= this,
			doc					= $(document),
			opts, bottomPos, pastStartOffset, objFartherThanTopPos, objBiggerThanWindow, newpos, checkTimer, lastDocPos = doc.scrollTop(),
			parentPaddingTop 	= parseInt($obj.parent().css('padding-top')) + 190,
			startOffset 		= $obj.parent().offset().top;
		
		$.extend( $.fn.stickyfloat.opts, options, { startOffset:startOffset, offsetY:parentPaddingTop} );
		opts = $.fn.stickyfloat.opts;
		$obj.css({ position: 'absolute' });
		
		if(opts.lockBottom){
			bottomPos = $obj.parent().height() - $obj.outerHeight() + parentPaddingTop - 300; //get the maximum scrollTop value
			if( bottomPos < 0 )
				bottomPos = 0;
		}
		
		function checkScroll(){
			if( opts.duration > 40 ){
				clearTimeout(checkTimer);
				checkTimer = setTimeout(function(){
					if( Math.abs(doc.scrollTop() - lastDocPos) > 0 ){
						lastDocPos = doc.scrollTop();
						initFloat();
					}
				},40);
			}
			else initFloat();
		}
		
		function initFloat(){
			$obj.stop(); // stop all calculations on scroll event
			
			pastStartOffset			= doc.scrollTop() > opts.startOffset;	// check if the window was scrolled down more than the start offset declared.
			objFartherThanTopPos	= $obj.offset().top > startOffset;	// check if the object is at it's top position (starting point)
			objBiggerThanWindow 	= $obj.outerHeight() < $(window).height();	// if the window size is smaller than the Obj size, then do not animate.
			
			// if window scrolled down more than startOffset OR obj position is greater than
			// the top position possible (+ offsetY) AND window size must be bigger than Obj size
			if( (pastStartOffset || objFartherThanTopPos) && objBiggerThanWindow ){ 
				newpos = (doc.scrollTop() -startOffset + opts.offsetY );

				if ( newpos > bottomPos )
					newpos = bottomPos;
				if ( doc.scrollTop() < opts.startOffset ) // if window scrolled < starting offset, then reset Obj position (opts.offsetY);
					newpos = parentPaddingTop;
				
				$obj.delay(opts.delay).animate({ top: newpos }, opts.duration , opts.easing );
			}
		}
		
		$(window).scroll(checkScroll);
	};
	
	$.fn.stickyfloat.opts = { duration:200, lockBottom:true , delay:0, easing:'linear' };
})(jQuery);


// google maps scripts
var geocoder;
var map;
function initializeGoogleMaps() {
	geocoder = new google.maps.Geocoder();
	
	geolocation_lat = $("#geolocation_lat");
	geolocation_long = $("#geolocation_long");
	if(geolocation_lat.length > 0 && geolocation_lat.val()){
		geolocation_lat = geolocation_lat.val();
	}else{
		geolocation_lat = 44.32476;
	}
	if(geolocation_long.length > 0 && geolocation_long.val()){
		geolocation_long = geolocation_long.val();
	}else{
		geolocation_long = 23.81347;
	}
	var latlng = new google.maps.LatLng(geolocation_lat, geolocation_long);
	var mapOptions = {
	  zoom: 13,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	var marker = new google.maps.Marker({
		position: latlng
	});
	marker.setMap(map);

}

function codeAddress() {
	var address = document.getElementById("geolocation_address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		map.setCenter(results[0].geometry.location);
		var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location
		});
		
		$("#geolocation_lat").val(results[0].geometry.location.$a);
		$("#geolocation_long").val(results[0].geometry.location.ab);
		$("#geolocation_address").val(results[0].formatted_address);
	  } else {
		alert("Geocode was not successful for the following reason: " + status);
	  }
	});
}
function loadGoogleMapsScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBN4x5jn8ipSogmMRIoGMwM9bADz-Pjf1s&sensor=false&callback=initializeGoogleMaps";
  document.body.appendChild(script);
}

function loadGeolocationScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeGoogleMaps";
  document.body.appendChild(script);
}


$('input').live("keypress", function(e) {
    if(e.which == 13 && $(this).attr("id") == "geolocation_address") {
		codeAddress();
    }
});