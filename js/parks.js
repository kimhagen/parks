$(function () {
	


  var map = L.map('map')
	map.locate({setView: true, maxZoom: 14});
	//var map = L.map('map').setView([35.0844, -106.6506], 13);

  L.tileLayer('http://{s}.tile.cloudmade.com/10109f44bde34f8e98850b7f42f183d9/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  }).addTo(map);

  $.getJSON("scripts/CityParks.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    var parks = json;


    picnicParks = jQuery.grep(parks, function(element, index){
     return element['Picnic_Tables'] > 0; // retain appropriate elements
    });
	
  	var picnicArray = [];
    $.each(picnicParks, function(i, item) {
      var marker = L.marker([item.lat, item.long]);
      marker.bindPopup(item.Park_Name);
      picnicArray.push(marker);
    });
  	var picnic = L.layerGroup(picnicArray);

   
    playParks = jQuery.grep(parks, function(element, index){
      return element['Play_Areas'] > 0  // retain appropriate elements
    });

  	var playArray = [];
    $.each(playParks, function(i, item) {
      var marker = L.marker([item.lat, item.long]);
      marker.bindPopup(item.Park_Name);
      playArray.push(marker);
    });
  	var playgrounds = L.layerGroup(playArray);
	
    tennisParks = jQuery.grep(parks, function(element, index){
      return (element['Lit_Tennis_Courts'] > 0 || element['Unlit_Tennis_Courts'] > 0)  // retain appropriate elements
    });
	
  	var tennisArray = [];
    $.each(tennisParks, function(i, item) {
      var marker = L.marker([item.lat, item.long]);
      marker.bindPopup(item.Park_Name);
      tennisArray.push(marker);
    });
  	var tennis = L.layerGroup(tennisArray);
	
	
    $('#playgrounds').click(function(){
			if (!map.hasLayer(playgrounds)) {
    		playgrounds.addTo(map);
			}
			else {
				map.removeLayer(playgrounds);
			}
			
    });

    $('#picnic').click(function(){
			if (!map.hasLayer(picnic)) {
    		picnic.addTo(map);
			}
			else {
				map.removeLayer(picnic);
			}

    });
	
    $('#tennis').click(function(){
			if (!map.hasLayer(tennis)) {
    		tennis.addTo(map);
			}
			else {
				map.removeLayer(tennis);
			}
		
    });
  });
	
	// Site UI elements
	
  $('#menuModal').modal('show')

});

