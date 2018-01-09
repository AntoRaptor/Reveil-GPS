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

var storage = window.localStorage;
// storage.clear();

var id; // id de l'alarme


// var booleen = false;

//var storage = window.localStorage; // LOCAL STORAGE

/**************************************/
/** Functions                         */
/**************************************/

var paramsUrl = function() {	
	
	// alert("PASSAGE DANS LA FONCTION PARAMSURL");

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
	
	slider.addEventListener("change", onSlider, false);
	
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

function onSlider() {
	console.log("<<<<<<<<<< Entre dans onSlider ! >>>>>>>>>>")
	var valeurSlider = document.getElementById("slider").value;
	document.getElementById("valeur-slider").innerHTML = "Distance = " + valeurSlider + " mètres";

	 // BOUTON VALIDER
	validationcercle.addEventListener("click", onValidationClicked, false);

	map.addCircle({
	  'center': {"lat": latMarqueur, "lng": lngMarqueur},
	  'radius': document.getElementById("slider").value,
	  'strokeColor' : '#AA00FF',
	  'strokeWidth': 5,
	  'fillColor' : '#880000'
	});

/* 	if (map.circle) {
		console.log("<<<<<<<<<< Suppression >>>>>>>>>>");
		map.circle.remove();
	} */
}

function onValidationClicked() {

	if (storage.getItem("sauveID")) {
		id = storage.getItem("sauveID");
	}
	else {
		id = 0;
		alert(typeof id);
	}

	var valeurSlider = document.getElementById("slider").value;

	// alert(valeurSlider);
	id = 1 + id; // id += 1 ou id = id + 1
	alert(id);

	var nomAlarme = prompt("Entrez un nom :");

	alarme = [id, nomAlarme, valeurSlider, latMarqueur, lngMarqueur];
	storage.setItem("sauveID", id);
	storage.setItem(id, alarme);

	document.location.href="index.html";

/* 	var idDemande = prompt("Entrez un id");
	alert(storage.getItem(idDemande)); */
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