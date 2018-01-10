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

var latMarqueur;
var lngMarqueur;

var storage = window.localStorage;

var id;

// storage.clear();

// var booleen = false;

//var storage = window.localStorage; // LOCAL STORAGE

/**************************************/
/** Functions                         */
/**************************************/


function onDeviceReady()
{
	testlocalstorage.addEventListener("click", onTest);
	clearlocalstorage.addEventListener("click", onClear);
}

function onTest() {
	console.log("onTest");

	if (storage.getItem("sauveID")) {
		id = storage.getItem("sauveID");
	}
	else {
		id = 0;
	}

	alert("dernier ID = " + id);

	var idDemande = prompt("Entrez un id");
	tab = storage.getItem(idDemande);
	// var affiche = "id : " + tab[0] + " / Nom : " + tab[1] + " / Lat : " + tab[2] + " / Lng : " + tab[3];
	alert(tab);
}

function onClear() {
	console.log("onClear");
	storage.clear();
	alert("storage nettoyé !");
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