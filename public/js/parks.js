function createPopupContent(item) {
	var popupHeader = "<h5>" + item.Park_Name + " Park</h5>";
	var popupBody = ""
	var boring = ["Park_Name","lat","long","Acres"]
	$.each(item, function(el, val) {
		var interestingItem = $.inArray(el, boring);
		if (val > 0 && (interestingItem == -1)) {
	  	popupBody = popupBody + "<div class='popup'>" + el.replace(/_/g," ") + ": " + val + "</div>";
		}
	});
	var popupLink = "<a target='_blank' href='http://maps.google.com/maps?saddr=" 
		+ "[35.0844, -106.6506]" + 
		"&daddr=" + item.lat + "," + item.long + "'>Get Directions</a>";
	return popupHeader + popupBody + popupLink;
}


function createLayerGroup(parks, condf) {
	var filteredItems = jQuery.grep(parks, condf);
	
	var itemArray = [];
	$.each(filteredItems, function(i, item){
		var marker = L.marker([item.lat, item.long], {icon: greenIcon});
		var content = createPopupContent(item);
		marker.bindPopup(content);
		itemArray.push(marker);
	});
	return L.layerGroup(itemArray);
}

function setupLayerClick(layerName, layer, map) {
	$('#' + layerName).click(function(){
		if (!map.hasLayer(layer)) {
			layer.addTo(map);
		}
		else {
			map.removeLayer(layer);
		}
	});
}

var greenIcon = L.icon({
    iconUrl: 'images/urbanpark.png',
    iconSize:     [32, 37], // size of the icon
    iconAnchor:   [15, 37], // point of the icon which will correspond to marker's location
    popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
});


var userLocation;


$(function () {
	

	var albuquerque = [35.0844, -106.6506];
	var browserSupportFlag = undefined;
	var map = L.map('map');
	map.setView(albuquerque, 13);
	
  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			foundLocation = [lat, lon];
			if (calcDistance(foundLocation, albuquerque) < 15) {
				map.setView(foundLocation, 13);
			}
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
  }

	L.tileLayer('http://{s}.tile.cloudmade.com/10109f44bde34f8e98850b7f42f183d9/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);
	


  $.getJSON("data/CityParks.json", function(json) {

    var parks = json;
		
		var picnicLayer = createLayerGroup(parks, function(el) { return el['Picnic_Tables'] > 0; });
		
		var tennisLayer = createLayerGroup(parks, function(el) { return (el['Lit_Tennis_Courts'] > 0 || el['Unlit_Tennis_Courts'] > 0);});
		
		var playgroundLayer = createLayerGroup(parks, function(el) { return el['Play_Areas'] > 0; });
		
		var basketballLayer = createLayerGroup(parks, function(el) { return (el['Full_Basketball_Courts'] > 0 || el['Half_Basketball_Courts'] > 0);});
	
	  var swimLayer = createLayerGroup(parks, function(el) { return (el['Indoor_Pools'] > 0 || el['Outdoor_Pools'] > 0);});
		
		var runLayer = createLayerGroup(parks, function(el) { return el['Jogging_Paths'] > 0; });
		
		var soccerLayer = createLayerGroup(parks, function(el) { return el['Soccer_Fields'] > 0; });

		var softballLayer = createLayerGroup(parks, function(el) { return (el['Lit_Softball_Fields'] > 0 || el['Unlit_Softball_Fields'] > 0);});
		
		var allLayer = createLayerGroup(parks, function(el) { return el });
		
		setupLayerClick("playgrounds", playgroundLayer, map);
		
		setupLayerClick("picnic", picnicLayer, map);
		
		setupLayerClick("tennis", tennisLayer, map);
		
		setupLayerClick("basketball", basketballLayer, map);
		
		setupLayerClick("swim", swimLayer, map);
		
		setupLayerClick("run", runLayer, map);
		
		setupLayerClick("soccer", soccerLayer, map);
		
		setupLayerClick("softball", softballLayer, map);
		
		setupLayerClick("all", allLayer, map);
	
  });
	
	// Site UI elements
	
	$.fn.modal.defaults.maxHeight = function(){
	    // subtract the height of the modal header and footer
	    return $(window).height() - 165; 
	}
	
  $('#menuModal').modal('show');
	$('#about').popover();
	
	


});

