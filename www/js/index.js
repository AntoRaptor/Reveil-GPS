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

var storage = window.localStorage;

var i = 1;

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
	


	/* while (checkConnection() == "No network connection") {
		alert("Vous devez êtres connecté à Internet");
		document.location.href="index.html";
		if (checkConnection() != "No network connection") {
			alert("Connecté !");
			break;
		};
	} */

	if (checkConnection() == "No network connection") {
		alert("Vous devez êtres connecté à Internet");
		document.location.href="index.html";
	}
	
	//Google Maps
	var div = document.getElementById("map_canvas");
	// Initialize the map view
	map = plugin.google.maps.Map.getMap(div);
	// Wait until the map is ready status.
	map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
	
}

function checkConnection() {
    var networkState = navigator.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
 
	// alert('Connection type: ' + states[networkState]);
	return(states[networkState]);
}

//Google Maps

function onMapReady() {
	
	  console.log("onMapReady | MAP READY");
	  
	  map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
	  
	  
	  var button = document.getElementById("button");
	  // button.addEventListener("click", onBtnClicked, false);
	  map.addEventListener(plugin.google.maps.event.MAP_CLICK, onMapClick);

	  /* while (i < (storage.getItem("sauveID")) + 1) {
		tab = storage.getItem(i);
		alert(tab);
		map.addMarker({
			'position': {"lat": tab[4], "lng": tab[5]},
			icon: 'blue',
			'title': tab,
			disableAutoPan: false
		  },function(marker) {
				    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
					marker.showInfoWindow();
				   });
			  })
		i = i + 1;
	  } */
	  
	  zoomDeDepart();
	}



function zoomDeDepart () {
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
					var r = confirm("Voulez-vous valider ?");
					if (r == true) {
						document.location.href="validation.html?cle1="+lat+"&cle2="+lng;
					}
			  });
		   })

}

/* function onBtnClicked() {
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
} */



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