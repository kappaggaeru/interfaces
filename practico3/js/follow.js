"use strict";
let body = document.getElementById("area");
body.addEventListener("mousemove",detectHover);
let x = document.getElementById("spanX");
let y = document.getElementById("spanY");
let div = document.getElementById("followMe");
let divRandom = document.getElementById("random");
divRandom.addEventListener("click",changeEffect);
function detectHover(event){
	let coordx = event.layerX;
	let coordy = event.layerY;
	x.innerHTML = coordx;
	y.innerHTML = coordy;
	div.style.top = coordy+"px";
	div.style.left = coordx+"px";
}
function changeEffect(){
	let r = Math.floor((Math.random()*4)+1);
	switch(r){
		case 1: divRandom.style.animation = "colorear 3s infinite";break;
		case 2: divRandom.style.animation = "escala 3s infinite";break;
		case 3: divRandom.style.animation = "trasladar 3s infinite";break;
		case 4: divRandom.style.animation = "rotar 3s infinite";break;
	}
}
