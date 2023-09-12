let textBold = document.getElementById("text-bold");
let textItalic = document.getElementById("text-italic");
let textToUnderline = document.getElementById("text-underline");
let img = document.getElementById("img");
let days = ["sunday","monday", "tuesday", "wednesday", "thirsday", "friday", "saturday"];
let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function saveNote(){
	let title = document.getElementById("title").value;
	let content = document.getElementById("content").innerHTML;
	document.getElementById("noteTitle").value = title;
	document.getElementById("noteContent").value = content;
}

function setDateAndTime(){
	let currentDate = document.getElementById("currentDate");
	let date = new Date();
	let month = date.getMonth();
	let day = date.getDay();
	let year = date.getFullYear();
	let time = date.getHours() + ":"+date.getMinutes();
	currentDate.innerHTML = `${days[day]}, ${date.getDate()} ${months[month]} ${year} at ${time}`;
}

let selection;

function insertImg(){
	let elt = img.value;
	document.execCommand("insertImage", false, elt);
	alert(elt);
}

function changeFontSize(){
	let size = document.getElementById("text-size").value;
	document.execCommand("fontSize", false, size);
}

function changeFontFamily(){
	let textFont = document.getElementById("text-font-family").value;
	document.execCommand("fontName", false, textFont);
}

function changeColor(){
	let textColor = document.getElementById("text-color").value;
	document.execCommand("foreColor", false, textColor);
}

function textToBold(){
	let elt = textBold;
	if(elt.classList.contains('activate'))
		elt.classList.remove('activate');
	else
		elt.classList.add('activate')
	document.execCommand('bold', false)
}

function textToItalic(){
	elt = textItalic
	if(elt.classList.contains('activate'))
		elt.classList.remove('activate');
	else
		elt.classList.add('activate')
	document.execCommand('italic', false)
}

function underlineText(){
	elt = textToUnderline;
	if(elt.classList.contains('activate'))
		elt.classList.remove('activate');
	else
		elt.classList.add('activate')
	document.execCommand('underline', false);
}
