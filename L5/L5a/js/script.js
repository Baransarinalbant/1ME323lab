// Initiering av globala variabler och händelsehanterare
function init() {
	let myImage = new ImageViewer("imgViewer"); // Ny lokal variabel för objektet
	document.querySelector("#categoryMenu").addEventListener("change",function() {
		//myImage.requestImages("xml/images" + this.selectedIndex + ".xml");
		myImage.requestImages("json/images" + this.selectedIndex + ".json");
		this.selectedIndex = 0;
	});
	document.querySelector("#prevBtn").addEventListener("click",function() {myImage.prevImage();});	// Händelsehanterare för tillbaka knappen
	document.querySelector("#nextBtn").addEventListener("click",function() {myImage.nextImage();});	// Händelsehanterare för nästa knappen
	
} // End init
window.addEventListener("load",init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----

// Constructor funktion
function ImageViewer(id) {
	this.titleElem = document.querySelector("#" + id + " h3"); 	// Id för titel
	this.imgElem = document.querySelector("#" + id + " img");	// Id för bilden
	this.captionElem = document.querySelector("#" + id + " p");	// Id för texten
	this.list = [{
		imgUrls: ["img/blank.png"],		// Tom bild
		imgCaptions: [""]	// Tom stäng för bild titeln
	}];
	this.imgIx = 0;		
	this.timer = null;		
}

// Gör ett Ajax-anrop för att läsa in begärd fil
ImageViewer.prototype.requestImages = function (file) { // Parametern nr används i url:en för den fil som ska läsas in
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	//request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	let self = this;	// Referens för this
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
		if (request.status == 200) self.getImages(request.responseText);
		//if (request.status == 200) self.getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
ImageViewer.prototype.getImages = function (JSONtext) { // Parametern XMLcode är hela den inlästa XML-koden
	let image = JSON.parse(JSONtext).image;			//Lokal variabel för image
	this.titleElem.innerHTML = JSON.parse(JSONtext).category;
	this.list = [];		// Nya tomma arrayer för bilder
	for (let i = 0; i < image.length; i++) {
		// Referenser till olika egenskaper i aktuellt accomodation-objekt
		this.list.push({
			imgUrls: image[i].url,
			imgCaptions: image[i].caption
		})
	}
	this.imgIx = 0;
	this.showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
ImageViewer.prototype.showImage = function() {
	this.imgElem.src = this.list[this.imgIx].imgUrls;
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.list[this.imgIx].imgCaptions;
} // End showImage

// Visa föregående bild
ImageViewer.prototype.prevImage = function() {
	if (this.imgIx > 0) this.imgIx--;
	else this.imgIx = this.list.length - 1; // Gå runt till sista bilden
	this.showImage();
} // End prevImage

// Visa nästa bild
ImageViewer.prototype.nextImage = function() {
	if (this.imgIx < this.list.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden
	this.showImage();
} // End nextImage
