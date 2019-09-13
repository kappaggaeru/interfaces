"use strict";
// alert("hola");
// let btnlimpiar = document.getElementById("limpiar");
// btnlimpiar.addEventListener("click",limpiar);

// let btnPintar = document.getElementById("pintar");
// btnPintar.addEventListener("click",pintar);

// let btnLimpiarCtx = document.getElementById("limpiarCtx");
// btnLimpiarCtx.addEventListener("click",limpiarCtx);

// let btnGradiente = document.getElementById("gradiente").addEventListener("click",gradiente);

// let btnNegroBlanco = document.getElementById("b&n").addEventListener("click",negroBlanco);
// let btnFile = document.getElementById("file").addEventListener("click",getFile);

// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");

// function pintar(){
// 	ctx.fillStyle = "#000000";
// 	ctx.fillRect(0,0,canvas.width,canvas.height);
// }
// function limpiarCtx(){
// 	ctx.fillStyle = "#ff0000";
// 	ctx.fillRect(0,0,canvas.width,canvas.height);
// }
// function limpiar(){
// 	let width = canvas.width;
// 	let height = canvas.height;
// 	let imageData = ctx.createImageData(width,height);
// 	createImageData(imageData,width,height);
// }
// function createImageData(imageData,width,height){
// 	for(let x=0; x<width; x++){
// 		for(let y=0; y<height; y++){
// 			// setPixel(imageData,x,y,r,g,b,a);
// 			setPixel(imageData,x,y,0,0,0,0);
// 		}
// 	}
// }
// function setPixel(imageData,x,y,r,g,b,a){
// 	let index = (x + y * imageData.width) *4;
// 	imageData.data[index+0] = r;
// 	imageData.data[index+1] = g;
// 	imageData.data[index+2] = b;
// 	imageData.data[index+3] = a;
// 	ctx.putImageData(imageData,x,y);
// }
// function gradiente(){
// 	let r = 0;
// 	let g = 0;
// 	let b = 0;
// 	let a = 255;
// 	let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
// 	for(let x=0; x<canvas.height; x++){
// 		for(let y=0; y<canvas.width; y++){
// 			setPixel(imgData,y,x,r,g,b,255);
// 		}
// 		if(x <= canvas.height/2){
// 			r++;
// 			g++;
// 			b--;
// 		}else{
// 			g--;
// 		}
// 	}
// 	ctx.putImageData(imgData,0,0);
// }
// function negroBlanco(){
// 	console.log("negroBlanco");
// 	let color;
// 	let a = 255;
// 	let width = canvas.width;
// 	// let width = 50;
// 	// let height = canvas.height;
// 	console.log("Alto canvas: "+canvas.height);
// 	console.log("Ancho canvas: "+canvas.width);
// 	let height = canvas.height/2;
// 	// let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
// 	// let imgData = ctx.getImageData(0,0,100,100);
// 	let imgData = ctx.getImageData(0,0,width,height);
// 	for(let x=0; x<height; x++){
// 		color = x / height * a;
// 		for(let y=0; y<width; y++){
// 			setPixel(imgData,y,x,color,color,color,a);
// 		}
// 	}
// }
// function getFile(){
// 	let file = document.getElementById("inputfile").value;
// 	let largo = file.lenght;
// 	console.log("Largo:"+largo);
// 	console.log(file[5]);
// 	console.log(file);
// 	// let img = new Image();
// 	// img.src = file;
// 	img.onload = function(){
// 		let ancho = canvas.width;
// 		let alto = canvas.height;
// 		console.log(image.width);
// 		console.log(image.height);
// 		ctx.drawImage(img,0,0,ancho,alto);
// 	}
// 	// document.getElementById("contenido").appendChild(img);
// }

// codigo de mariano
let fileChooser = document.getElementById('imagen');
fileChooser.addEventListener('change', handleFileSelect, false);

function handleFileSelect(event){
  let files = event.target.files;
  if(files.length === 0){
    return;
  }
  let file = files[0];
  if(file.type !== '' && !file.type.match('image.*')){
    return;
  }
   window.URL = window.URL || window.webkitURL;
   let imageURL = window.URL.createObjectURL(file);
   pintar(imageURL);
   }

function pintar(url){

  // document.getElementById('red').value;
  // let g = document.getElementById('green').value;
  // let b = document.getElementById('blue').value;
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 1000;
    // let width = document.getElementById('ejeX').value;
    // let height = document.getElementById('ejeY').value;
    let ctx = document.getElementById("canvas").getContext("2d");
    let imageData;
    let imagen1 = new Image();
    imagen1.src = url;
    imagen1.onload = function() {

      myDrawImageMethod(this, ctx, imagen1);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);


      ctx.putImageData(imageData, 0, 0);
    }


}
function myDrawImageMethod(image, ctx, imagen1){
  ctx.drawImage(imagen1, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}


function setPixel(imageData, x, y, r, g, b, a){
  let index = (x + y * imageData.width) * 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}


function pintarPixeles(){
  let width = document.getElementById('ejeX').value;
  let height = document.getElementById('ejeY').value;
  let ctx = document.getElementById("canvas").getContext("2d");
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let hex = document.getElementById('colorPicker').value;
  let color = hexToRgb(hex);
  for(x=0; x< width; x++){
    for(y=0; y< height; y++){
      setPixel(imageData, x, y, color.r, color.g, color.b, 255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
document.getElementById("escalaGrises").addEventListener("click",escalaDeGrises);
document.getElementById("negativo").addEventListener("click",colorNegativo);
document.getElementById("sepia").addEventListener("click",colorSepia);

function filterGris(){
	let color;
	let ctx = document.getElementById("canvas").getContext("2d");
	let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	for(let x=0; x<canvas.width; x++){
		for(let y=0; y<canvas.height; y++){
			color = getRed(imageData,x,y) + getGreen(imageData,x,y) + getBlue(imageData,x,y);
			color = color/3;
			setPixel(imageData,x,y,color,color,color,255);
		}
	}
	ctx.putImageData(imageData,0,0);
}
function filterNegativo(){
	let ctx = document.getElementById("canvas").getContext("2d");
	let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	let i;
		for (i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i] = 255 - imageData.data[i];
			imageData.data[i+1] = 255 - imageData.data[i+1];
			imageData.data[i+2] = 255 - imageData.data[i+2];
			imageData.data[i+3] = 255;
		}
	ctx.putImageData(imageData,0,0);
}
function filterSepia(){
	let r = [0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 47, 48, 49, 52, 54, 55, 57, 59, 60, 62, 65, 67, 69, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 94, 97, 99, 101, 103, 107, 109, 111, 112, 116, 118, 120, 124, 126, 127, 129, 133, 135, 136, 140, 142, 143, 145, 149, 150, 152, 155, 157, 159, 162, 163, 165, 167, 170, 171, 173, 176, 177, 178, 180, 183, 184, 185, 188, 189, 190, 192, 194, 195, 196, 198, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 219, 220, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 229, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 242, 243, 244, 244, 245, 245, 245, 246, 247, 247, 248, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    g = [0, 0, 1, 2, 2, 3, 5, 5, 6, 7, 8, 8, 10, 11, 11, 12, 13, 15, 15, 16, 17, 18, 18, 19, 21, 22, 22, 23, 24, 26, 26, 27, 28, 29, 31, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 41, 43, 44, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 105, 106, 107, 108, 109, 111, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 135, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 151, 153, 154, 155, 157, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 186, 186, 187, 188, 189, 190, 192, 193, 194, 195, 195, 196, 197, 199, 200, 201, 202, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 219, 219, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 231, 232, 232, 232, 233, 234, 235, 235, 236, 236, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 242, 243, 244, 245, 245, 246, 246, 247, 247, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 255],
    b = [53, 53, 53, 54, 54, 54, 55, 55, 55, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 61, 61, 62, 62, 63, 63, 63, 64, 65, 65, 65, 66, 66, 67, 67, 67, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 73, 74, 74, 75, 75, 76, 77, 77, 78, 78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 89, 89, 90, 90, 91, 91, 93, 93, 94, 94, 95, 95, 96, 97, 98, 98, 99, 99, 100, 101, 102, 102, 103, 104, 105, 105, 106, 106, 107, 108, 109, 109, 110, 111, 111, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 119, 121, 121, 122, 122, 123, 124, 125, 126, 126, 127, 128, 129, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 137, 138, 139, 140, 140, 141, 142, 142, 143, 144, 145, 145, 146, 146, 148, 148, 149, 149, 150, 151, 152, 152, 153, 153, 154, 155, 156, 156, 157, 157, 158, 159, 160, 160, 161, 161, 162, 162, 163, 164, 164, 165, 165, 166, 166, 167, 168, 168, 169, 169, 170, 170, 171, 172, 172, 173, 173, 174, 174, 175, 176, 176, 177, 177, 177, 178, 178, 179, 180, 180, 181, 181, 181, 182, 182, 183, 184, 184, 184, 185, 185, 186, 186, 186, 187, 188, 188, 188, 189, 189, 189, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 195, 196, 196, 196, 197, 197, 197, 198, 199];
	let noise = 20;
	let ctx = document.getElementById("canvas").getContext("2d");
	let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	for (let i=0; i < imageData.data.length; i+=4) {
		// change image colors
		imageData.data[i] = r[imageData.data[i]];
		imageData.data[i+1] = g[imageData.data[i+1]];
		imageData.data[i+2] = b[imageData.data[i+2]];
		// apply noise
		if (noise > 0) {
			noise = Math.round(noise - Math.random() * noise);
			for(let j=0; j<3; j++){
				let iPN = noise + imageData.data[i+j];
				imageData.data[i+j] = (iPN > 255) ? 255 : iPN;
			}
		}
	}
	// put image data back to context
	ctx.putImageData(imageData, 0, 0);
}

function getRed(imageData,x,y){
	let index = (x + y * imageData.width) * 4;
	return imageData.data[index+0];
}
function getGreen(imageData,x,y){
	let index = (x + y * imageData.width) * 4;
	return imageData.data[index+1];
}
function getBlue(imageData,x,y){
	let index = (x + y * imageData.width) * 4;
	return imageData.data[index+2];
}