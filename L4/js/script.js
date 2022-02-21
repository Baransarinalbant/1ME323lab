// Initiering av globala variabler och händelsehanterare
function init() {
	let myImage = new MyObject("imgViewer"); // Ny lokal variabel för objektet
	document.querySelector("#categoryMenu").addEventListener("change",function() {
		myImage.requestImages("xml/images" + this.selectedIndex + ".xml");
		this.selectedIndex = 0;
	});
	document.querySelector("#prevBtn").addEventListener("click",function() {myImage.prevImage();});
	document.querySelector("#nextBtn").addEventListener("click",function() {myImage.nextImage();});
	
} // End init
window.addEventListener("load",init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----

// Constructor funktion
function MyObject(id) {
	this.titleElem = document.querySelector("#" + id + " h3"); 	// Id för titel
	this.imgElem = document.querySelector("#" + id + " img");	// Id för bilden
	this.captionElem = document.querySelector("#" + id + " p");	// Id för texten
	this.list = {
		imgUrls: ["img/blank.png"],	
		imgCaptions: [""]
	};
	this.imgIx = 0;		//
	this.timer = null;	//
}

// Gör ett Ajax-anrop för att läsa in begärd fil
MyObject.prototype.requestImages = function (file) { // Parametern nr används i url:en för den fil som ska läsas in
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	let self = this;	// Referens för this
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) self.getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
MyObject.prototype.getImages = function (XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	this.list.imgUrls = [];		// Nya tomma arrayer för bilder
	this.list.imgCaptions = [];	// och bildtexter
	// Går igenom urlElems och pushar in bilden och texten
	for (let i = 0; i < urlElems.length; i++) {
		this.list.imgUrls.push(urlElems[i].firstChild.data);
		this.list.imgCaptions.push(captionElems[i].firstChild.data);
	}
	this.imgIx = 0;
	this.showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
MyObject.prototype.showImage = function() {
	this.imgElem.src = this.list.imgUrls[this.imgIx];
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.list.imgCaptions[this.imgIx];
} // End showImage

// Visa föregående bild
MyObject.prototype.prevImage = function() {
	if (this.imgIx > 0) this.imgIx--;
	else this.imgIx = this.list.imgUrls.length - 1; // Gå runt till sista bilden
	this.showImage();
} // End prevImage

// Visa nästa bild
MyObject.prototype.nextImage = function() {
	if (this.imgIx < this.list.imgUrls.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden
	this.showImage();
} // End nextImage
