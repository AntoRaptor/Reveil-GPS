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

var latMarqueur;
var lngMarqueur;



/**************************************/
/** Functions                         */
/**************************************/

var paramsUrl = function() {	
	
	var t = location.search.substring(1).split('&');
	var f = [];
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}

var params = paramsUrl();

latMarqueur = params["cle1"];
lngMarqueur = params["cle2"];

console.log("LATITUDE PASSEE EN URL "+latMarqueur);
console.log("LONGITUDE PASSEE EN URL "+lngMarqueur);


function onDeviceReady()
{
	console.log("onDeviceReady");
	
	//Google Maps
	var div = document.getElementById("map_canvas");
	// initialisation de la map
	map = plugin.google.maps.Map.getMap(div);
	
	map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}




//Google Maps

function onMapReady() {
	
	  console.log("onMapReady");
	  
	  map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
	  
	  zoomCurseur();
	}



function zoomCurseur () {
	console.log("zoomCurseur");
		
		//navigator.geolocation.getCurrentPosition(onSuccess, onError);
			    
			map.animateCamera({
				target: new plugin.google.maps.LatLng(latMarqueur, lngMarqueur),
				zoom: 17
			})
			
			function onLocationError( error_msg ) {
			    alert( error_msg );
			}
}

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
	console.log("onBackButton");
}

/**************************************/