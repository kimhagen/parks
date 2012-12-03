function createPopupContent(item) {
	var popupHeader = "<h5>" + item.Park_Name + "</h5>";
	var popupBody = ""
	var boring = ["Park_Name","lat","long","Acres"]
	$.each(item, function(el, val) {
		var interestingItem = $.inArray(el, boring);
		if (val > 0 && (interestingItem == -1)) {
	  	popupBody = popupBody + "<p>" + el.replace(/_/g," ") + ": " + val + "</p>";
		}
	});
	var popupLink = "<a href='http://maps.google.com/maps?saddr=" 
		+ "35.0844,-106.6506" + 
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





$(function () {
	
	var initialLocation;
	var albuquerque = [35.0844, -106.6506];
	var browserSupportFlag = undefined;
	
  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var initialLocation = [lat, lon];
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    initialLocation = albuquerque;
  }
	

  var map = L.map('map')
	map.locate({setView: true, maxZoom: 14});
	//var map = L.map('map').setView(initialLocation, 13);

  L.tileLayer('http://{s}.tile.cloudmade.com/10109f44bde34f8e98850b7f42f183d9/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);
	


  $.getJSON("data/CityParks.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    var parks = json;
		
		var picnicLayer = createLayerGroup(parks, function(el) { return el['Picnic_Tables'] > 0; });
		
		var tennisLayer = createLayerGroup(parks, function(el) { return (el['Lit_Tennis_Courts'] > 0 || el['Unlit_Tennis_Courts'] > 0);});
		
		var playgroundLayer = createLayerGroup(parks, function(el) { return el['Play_Areas'] > 0; });
		
		var basketballLayer = createLayerGroup(parks, function(el) { return (el['Full_Basketball_Courts'] > 0 || el['Half_Basketball_Courts'] > 0);});
	
	  var swimLayer = createLayerGroup(parks, function(el) { return (el['Indoor_Pools'] > 0 || el['Outdoor_Pools'] > 0);});
		
		var runLayer = createLayerGroup(parks, function(el) { return el['Jogging_Paths'] > 0; });
		
		var soccerLayer = createLayerGroup(parks, function(el) { return el['Soccer_Fields'] > 0; });
		
		setupLayerClick("playgrounds", playgroundLayer, map);
		
		setupLayerClick("picnic", picnicLayer, map);
		
		setupLayerClick("tennis", tennisLayer, map);
		
		setupLayerClick("basketball", basketballLayer, map);
		
		setupLayerClick("swim", swimLayer, map);
		
		setupLayerClick("run", runLayer, map);
		
		setupLayerClick("soccer", soccerLayer, map);
	
  });
	
	// Site UI elements
	
  $('#menuModal').modal('show')

});

