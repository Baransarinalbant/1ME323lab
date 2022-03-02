// Globala variabler
var resElem;	// Referens till elementet för resultat

// Initiering av globala variabler och händelsehanterare.
function init() {
	resElem = document.getElementById("result");
	let btnElems = document.getElementById("movieButtons").getElementsByTagName("button");
	for (let i = 0; i < btnElems.length; i++) {
		btnElems[i].addEventListener("click",selectMovies);
	}
} // End init
window.addEventListener("load",init);

// Väljer marvel filen
function selectMovies() {
	let marvel = this.value; // Land i vald knapp
	requestData(marvel);
} // End selectCountry


// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(filename) { // filname är namnet (utan ändelse) på den fil som ska hämtas
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","data/" + filename + ".json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getData(request.responseText); // status 200 (OK) --> filen fanns
												// Obs! responseText, då det är JSON
			else resElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestDepartmentinfo

// Tolka XML-koden och skriv ut på önskad form
function getData(JSONtext) {
	let movies = JSON.parse(JSONtext).movies; // Listan (array) movies
	let HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < movies.length; i++) {
		// Skriver ut olika egenskaperna i filmerna
		HTMLcode += 
            "<p><b>Namn:</b> " + movies[i].name + "</p>" +
			"<p><b>Årtal:</b> " + movies[i].when + "</p>" +
			"<p><b>Längd:</b> " + movies[i].length + "</p>" +
			"<b>imdb: </b>" + "<a href=" + movies[i].imdb.url + ">Tryck här</a>" +
			"<hr>";
	}
	resElem.innerHTML = HTMLcode;
} // End getData