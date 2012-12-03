function toRadians(degrees) {
	return degrees * Math.PI / 180;
}

function calcDistance(location1, location2) {
	var R = 3961;
	var lat1 = toRadians(location1[0]);
	var lat2 = toRadians(location2[0]);
	var lon1 = toRadians(location1[1]);
	var lon2 = toRadians(location2[1]);


	var d = Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
	                  Math.cos(lat1)*Math.cos(lat2) *
	                  Math.cos(lon2-lon1)) * R;
										
	console.log(d);
	return d;
};