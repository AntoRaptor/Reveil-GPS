/**************************************/
/** Event Listeners                   */
/**************************************/

document.addEventListener("deviceready", onDeviceReady);
document.addEventListener("pause", onPause);
document.addEventListener("resume", onResume);
document.addEventListener("backbutton", onBackButton);

/**************************************/
/** Variables                         */
/**************************************/

var map;
var latitude;
var longitude;
var latMarqueur;
var lngMarqueur;



/**************************************/
/** Functions                         */
/**************************************/

function onDeviceReady()
{
	console.log("onDeviceReady | LANCEMENT DE L'APPLICATION");
	
/*	var parentElement = document.getElementById("button");
	var listeningElement = parentElement.querySelector(".listening");
	var receivedElement = parentElement.querySelector(".received");*/
	
/*	listeningElement.style.display = "none";
	receivedElement.style.display = "block";*/
	
	
	//Google Maps
	var div = document.getElementById("map_canvas");
	// Initialize the map view
	map = plugin.google.maps.Map.getMap(div);
	// Wait until the map is ready status.
	map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
	
}

//Google Maps

function onMapReady() {
	
	  console.log("onMapReady");
	  
	  map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
	  
	  
	  var button = document.getElementById("button");
	  button.addEventListener("click", onBtnClicked, false);
	  map.addEventListener(plugin.google.maps.event.MAP_CLICK, onMapClick);
	  
	  zoomCurseur();
	}



function zoomCurseur () {
	console.log("zoomDeDepart");
		
		//navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
		var option = {
			    enableHighAccuracy: true      // Force GPS
			};
			map.getMyLocation(option, onLocationSuccess, onLocationError);
	
			function onLocationSuccess( result ) {
			    var json = JSON.stringify( result, null, 4 );
			    console.log(json);
			    //var obj = JSON.parse(json);
			    latitude = result.latLng.lat;
			    longitude = result.latLng.lng;
			    
			    map.animateCamera({
					target: new plugin.google.maps.LatLng(latitude, longitude),
					zoom: 17
				})
			    
			}
			function onLocationError( error_msg ) {
			    alert( error_msg );
			}
}

function onMapClick(latLng){
	latMarqueur = latLng.lat;
	lngMarqueur = latLng.lng;
	console.log(latMarqueur);
	console.log(lngMarqueur)
	creationMarqueur(latMarqueur, lngMarqueur);

}

function creationMarqueur(lat, lng){
	/*if (booleen === true){
		console.log("la !");
		this.remove();
	}*/
	//booleen = true;
	map.addMarker({
	     'position': {"lat": lat, "lng": lng},
	     'title': "Cliquez ici pour valider",
	     disableAutoPan: true
	   },function(marker) {
		        marker.showInfoWindow();
		        marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
		            marker.remove();
		        });
		   		marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function() {
				   alert("VALIDE");
				   document.location.href="validation.html?cle1="+latMarqueur+"&cle2="+lngMarqueur;
			  });
		   })

}

function onBtnClicked() {
    var option = {
        enableHighAccuracy: true      // Force GPS
    };
    map.getMyLocation(option, onLocationSuccess, onLocationError);

    function onLocationSuccess( result ) {
        var json = JSON.stringify( result, null, 4 );
        console.log(json);
        //var obj = JSON.parse(json);
        latitude = result.latLng.lat;
        longitude = result.latLng.lng;
        
        map.animateCamera({
            target: new plugin.google.maps.LatLng(latitude, longitude),
            zoom: 17
        })
        
    }
    function onLocationError( error_msg ) {
        alert( error_msg );
    }
}



// Geolocalisation :



var onSuccess = function(position) {
	latitude = position.coords.latitude;
    longitude = position.coords.longitude;
/*    'Altitude: '          + position.coords.altitude          + '\n' +
    'Accuracy: '          + position.coords.accuracy          + '\n' +
    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    'Heading: '           + position.coords.heading           + '\n' +
    'Speed: '             + position.coords.speed             + '\n' +
    'Timestamp: '         + position.timestamp                + '\n';*/
    
};
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
// navigator.geolocation.getCurrentPosition(onSuccess, onError);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onPause()
{
	console.log("onPause");
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onResume()
{
	console.log("onResume");
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onBackButton()
{
	console.log(latitude);
}

/**************************************/