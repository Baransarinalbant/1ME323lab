// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click",listLinks);
	
	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click",addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");
	
	document.getElementById("teacherBtn").addEventListener("click",addTeachers); // Används i extramerit
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {

	let aElems = document.querySelectorAll("main section:nth-of-type(1) div:first-of-type a");

	for (let i = 0; i < aElems.length; i++) {  // loop som går igenom a element
		let copy = aElems[i].cloneNode(true);   // Klonar a element
		let newText = document.createElement("p");   // Skapar ett p element
		newText.appendChild(copy);  // lägger till p elem i a elem
		linkListElem.appendChild(newText);   // utför appendchild på alemsen till listan
		copy.setAttribute("target", "_blank");   // lägger till attribut
	}

	
} // End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {

	let checkElem = courseListElem.querySelectorAll("p");
	for (let i = 0; i < checkElem.length; i++) {
	if (checkElem[i].innerHTML == this.innerHTML)
	return;
	}
	let newText = document.createElement("p");
	let textNode = document.createTextNode(this.innerHTML);
	newText.appendChild(textNode);
	courseListElem.appendChild(newText);
	courseListElem.insertBefore(newText, courseListElem.childNodes[0]);
	newText.style.cursor = "pointer";
	newText.addEventListener("click", removeCourse);
	
} // End addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	courseListElem.removeChild(this);
	
	//courseListElem.removeChild(this.childNodes[0]);
	
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault","Rune Körnefors","Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault","http://lnu.se/personal/rune.kornefors","https://lnu.se/personal/jorgeluis.zapico/"];
	
} // End addTeachers
