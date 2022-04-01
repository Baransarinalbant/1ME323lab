// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position:{lat:59.32813824714785,lng:18.054173415968535},title:"Stockholms Stadshus"},
			{position:{lat:59.3250219668299, lng:18.064419252430316},title:"Riddarholmskyrkan"},
			{position:{lat:59.32702217259398, lng:18.084495567626142},title:"Moderna Museet"},
			{position:{lat:59.32714673440685, lng:18.071694073983124},title:"Kungliga Slottet"},
			{position:{lat:59.33499874704196, lng:18.08934242259013},title:"Historiska Museet"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "6fefecdcad87be108480549842a0caa6";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	myMarkers = [];
	var buttons = document.getElementById("addrBtns").getElementsByTagName("button");  // Sparar knapparna i addrBtns i varibeln buttons
	
	initMap();
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");

	

	for (let i = 0; i < markerData.length; i++) { // Går igenom alla 5 knapparna
		buttons[i].innerHTML = markerData[i].title; // Lägger in title som namn på knapparna
		buttons[i].addEventListener("click", showAddrMarker); // Lääger till händelsehanterare med klick och visar marker
		buttons[i].setAttribute("data-ix", i);  // Lägger till attributet data-ix med loopvariabelns värde
	}
	
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById('map'),
			{
				center: {lat:59.329603062560295, lng:18.071571647876166},
				zoom: 14,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();  // Anropar funktionen hidemarkers
	userMarker = new google.maps.Marker();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	mapLocationElem.innerHTML = "Latitud: " + e.latLng.lat() + " Longitud: " + e.latLng.lng();  //Skriver ut kortdinaterna där användaren klickar
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {

	hideMarkers();
	myMarkers[this.getAttribute("data-ix")].setMap(myMap);
	
} // End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs
