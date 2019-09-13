"use strict";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
document.getElementById("cerrarPol").addEventListener("click",cerrarPoligono);
// document.getElementById("borrar").addEventListener("click",borrarNodo);

let BB = canvas.getBoundingClientRect();
let offsetX = BB.left;
let offsetY = BB.top;
let WIDTH = canvas.width;
let HEIGHT = canvas.height;
let dragok = false;
let startX;
let startY;

// canvas.onsdblclick = crearCirculo;
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;
canvas.ondblclick = crearCirculo;
let poligonos = [];
let contPol = 0;
clear();
function crearCirculo(){
	let x = event.layerX;
	let y = event.layerY;
	let c = "FF0000";
	let r = 10;
	poligonos[contPol].addCirculo(new Circle(x,y,c,r));
	dibujarTodo();
}
function crearCentro(){
	let avgX = 0;
	let avgY = 0;
	let size = poligonos[contPol].getSize();
	for(let i=0; i<poligonos[contPol].getSize();i++){
		avgX += poligonos[contPol].getCirculo(i).getX();
		avgY += poligonos[contPol].getCirculo(i).getY();
	}
	let c = "00FF00";
	let r = 7;
	poligonos[contPol].addCentro(new Circle(avgX/size,avgY/size,c,r));
}
class Circle{
	constructor(x,y,c,r){
		this.posX = x;
		this.posY = y;
		this.radio = r;
		this.color = "#"+c;
		this.isDragging = false;
	}
	getX(){return this.posX;}
	getY(){return this.posY;}
	getColor(){return this.color;}
	getRadio(){return this.radio;}
	getDragging(){return this.isDragging;}
	setTrue(){this.isDragging = true;}
	setFalse(){this.isDragging = false;}
	setPlusX(x){this.posX += x;}
	setPlusY(y){this.posY += y;}
	setX(x){this.posX = x;}
	setY(y){this.posY = y;}
}
function dibujarCirculo(c){
	if(c != null){
		ctx.beginPath();
		ctx.fillStyle = c.getColor();
		ctx.arc(c.getX(),c.getY(),c.getRadio(),0,Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
}
function cerrarPoligono(){
	console.log("Poligono cerrado");
	poligonos[contPol].cerrar();
	crearCentro();
	dibujarTodo();
	contPol++;
	poligonos[contPol] = new Poligono();
}
function dibujarTodo(){
	clear();
	for(let i=0; i<=contPol; i++){
		for(let j=0; j<poligonos[i].getSize(); j++){
			// if(poligonos[i] != null)
				dibujarCirculo(poligonos[i].getCirculo(j));
		}
		if(poligonos[i].estaCerrado()){
			dibujarCirculo(poligonos[i].getCentro());
		}
	}
	dibujarLineas();
}
function clear() {
	ctx.fillStyle = "#ffffff";
	ctx.rect(0,0,WIDTH,HEIGHT);
	ctx.fill()
	// ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function dibujarLineas(){
	for(let i=0;i<=contPol;i++){
		for(let j=0;j<poligonos[i].getSize();j++){
			let c1 = poligonos[i].getCirculo(j);
			let c2 = poligonos[i].getCirculo(j+1);
			if(c1 != null && c2 != null)
				dibujarUnaLinea(c1,c2);
		}
		if(poligonos[i].estaCerrado()){
			let size = poligonos[i].getSize();
			dibujarUnaLinea(poligonos[i].getCirculo(0),poligonos[i].getCirculo(size-1));
		}

	}
}
function dibujarUnaLinea(c1,c2){
	ctx.beginPath();
	ctx.moveTo(c1.getX(), c1.getY());
	ctx.lineTo(c2.getX(), c2.getY());
	ctx.strokeStyle = "yellow";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.closePath();
}
class Poligono{
	constructor(){
		this.circulos = [];
		this.centro;
		this.contador = 0;
		this.cerrado = false;
	}
	addCirculo(c){
		this.circulos.push(c);
		this.contador++;
	}
	addCentro(c){
		this.centro  = c;
		// this.contador++;
	}
	getCentro(){
		return this.centro;
	}
	getSize(){
		return this.contador;
	}
	getCirculo(i){
		if(this.circulos[i] != null)
			return this.circulos[i];
	}
	cerrar(){
		this.cerrado = true;
	}
	estaCerrado(){
		return this.cerrado;
	}
	recalcularCentro(){
		let sumX = 0;
		let sumY = 0;
		for(let i=0;i<this.getSize();i++){
			sumX += this.circulos[i].getX();
			sumY += this.circulos[i].getY();
		}
		this.setCentro(sumX/this.getSize(),sumY/this.getSize());
	}
	setCentro(x,y){
		this.centro.setX(x);
		this.centro.setY(y);
	}
	eliminarNodo(i){
		for(let j=i;j<this.getSize()-1;j++)
			this.circulos[j] = this.circulos[j+1];
	}
}
poligonos[contPol] = new Poligono();

// codigo del drag
function myDown(e) {
    e.preventDefault();
    e.stopPropagation();
    let mx = parseInt(e.clientX - offsetX);
    let my = parseInt(e.clientY - offsetY);
	dragok = false;
	for (let i=0; i<=contPol; i++) {
		for(let j = 0; j<poligonos[i].getSize(); j++){
			let r = poligonos[i].getCirculo(j);
			if(r != null){

				let dx=r.getX()-mx;
				let dy=r.getY()-my;
				if(dx*dx+dy*dy < r.getRadio() * r.getRadio()){
					console.log("Circulo nro: "+j);
					dragok = true;
					r.setTrue();
				}
			}
			if(poligonos[i].estaCerrado()){
				let r = poligonos[i].getCentro();
				let dx=r.getX()-mx;
				let dy=r.getY()-my;
				if(dx*dx+dy*dy < r.getRadio() * r.getRadio()){
					console.log("Centro");
					dragok = true;
					r.setTrue();
				}	
			}
		}
	}
	startX = mx;
	startY = my;
}
function myUp(e) {  
	e.preventDefault();
	e.stopPropagation();
	dragok = false;
	for (let i=0; i<=contPol; i++) {
		for(let j = 0; j<poligonos[i].getSize(); j++){
			poligonos[i].getCirculo(j).setFalse();
		}
		if(poligonos[i].estaCerrado()){
			poligonos[i].getCentro().setFalse();
		}
	}
}
function myMove(e) {
	if (dragok){
		e.preventDefault();
		e.stopPropagation();
		let mx = parseInt(e.clientX - offsetX);
		let my = parseInt(e.clientY - offsetY);
		let dx = mx - startX;
		let dy = my - startY;
		
		for(let i=0; i<=contPol; i++){
			if(poligonos[i].estaCerrado()){
				if(poligonos[i].getCentro().isDragging){
					// moves todos esos nada mas
					for(let j=0; j<poligonos[i].getSize();j++){
						let r = poligonos[i].getCirculo(j);
						r.setPlusX(dx);
						r.setPlusY(dy);
					}
					poligonos[i].getCentro().setPlusX(dx);
					poligonos[i].getCentro().setPlusY(dy);
				}
			}
			for(let j=0; j<poligonos[i].getSize();j++){
				let r = poligonos[i].getCirculo(j);
				if (r.getDragging()) {
					r.setPlusX(dx);
					r.setPlusY(dy);
				}
				if(poligonos[i].estaCerrado())
					poligonos[i].recalcularCentro();
			}
			
		}
		dibujarTodo();
		startX = mx;
		startY = my;
	}
}
// function borrarNodo(e){
// 	e.preventDefault();
//     e.stopPropagation();
//     let mx = parseInt(e.clientX - offsetX);
//     let my = parseInt(e.clientY - offsetY);
// 	canvas.addEventListener("click",borrar);
// 	function borrar(){
// 		console.log("borrando?");
// 		for(let i=0;i<=contPol;i++){
// 			for(let j=0; j<poligonos[i].getSize();j++){
// 				let r = poligonos[i].getCirculo(j);
// 				if(r != null){

// 					let dx=r.getX()-mx;
// 					let dy=r.getY()-my;
// 					if(dx*dx+dy*dy < r.getRadio() * r.getRadio()){
// 						poligonos[i].eliminarNodo(j);
// 					}
// 				}
// 			}
// 		}
// 	}
// 	// canvas.removeEventListener("click",borrar);
// }