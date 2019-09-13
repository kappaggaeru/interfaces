// CANVAS
// 2. Pintar una región rectangular de un color utilizando el Contexto de HTML5.




// mostrar la matriz en consola
// 4. Especificar la función para pintar un rectángulo utilizando un gradiente de la siguiente forma:
// punto4();
function punto4(){
	generarCanvas();

	let width = 100;
	let height = 100;
	let imageData = ctx.createImageData(width, height);
	let color = 0;
	let a = 255;
	for(let y=0; y<height; y++){
		color = y / height * a;
		for(let x=0; x<width; x++){
			// setPixel(imageData,x,y,r,g,b,a);
			setPixel(imageData,x,y,color,color,color,a);
		}
	}
}

// 5. Pintar un rectángulo en pantalla, utilizando un gradiente que vaya de negro a amarillo en la primera
// mitad del ancho del rectángulo, y de amarillo a rojo, en la segunda mitad. Por otro lado, en Y el
// degrade se mantiene constante.
// punto5();
function punto5(){
	let width = 100;
	let height = 200;
	let imageData = ctx.createImageData(width, height);
	let color = 0;
	let a = 255;
	for(let y=0; y<height/2; y++){
		color = y / height * a;
		for(let x=0; x<width; x++){
			// setPixel(imageData,x,y,r,g,b,a);
			setPixel(imageData,x,y,color,color,color,a);
		}
	}
}

// 6. Cargar una Imagen desde disco o URL
let imagen1 = new Image();
imagen1.src = "imagen.jpg";
// imagen1.crossOrigin = "Anonymous";
// "Access-Control-Allow-Origin:  *;"
// imagen1.setAttribute("width",100);
// imagen1.width = 500;
// console.log(imagen1.width);
// punto6();

function punto6(){

	imagen1.onload = function(){
		myDrawImageMethod(this);
	}
	// cambiarSizeCanvas(imagen1.width);
}
function myDrawImageMethod(image){
	let ancho = document.getElementById("canvas").width;
	let alto = document.getElementById("canvas").height;
	console.log(image.width);
	console.log(image.height);
	ctx.drawImage(imagen1,0,0,ancho,alto);
	// context.drawImage(img,x,y,width,height);
}

// b. Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el
// canvas.
// escalaDeGrises();
// accederPixeles();
function accederPixeles(){
	let imageData;
	let img = new Image();
	img.src = "imagen.jpg";
	img.onload = function(){
		ctx.drawImage(this,0,0,canvas.width,canvas.height);
		imageData = ctx.getImageData(0,0,this.width,this.height);
		let i;
		for (i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i] = 255 - imageData.data[i];
			imageData.data[i+1] = 255 - imageData.data[i+1];
			imageData.data[i+2] = 255 - imageData.data[i+2];
			imageData.data[i+3] = 255;
		}
		ctx.putImageData(imageData,0,0);
	}
}
function escalaDeGrises(){
	console.log("Escala de grises");
	imagen1.onload = function(){
		// myDrawImageMethod(this);
		ctx.drawImage(imagen1,0,0,canvas.width,canvas.height);
		// ctx.drawImage(imagen1,0,0);
		let imageData = ctx.getImageData(0,0,this.width,this.height);
		// let imageData = ctx.createImageData(this.width,this.height);
		// modificar pixeles
		let color = 0;
		for(let i=0; i<imageData.width; i++){
			for(let j=0; j<imageData.height; j++){
				color = getRed(imageData,i,j) + getGreen(imageData,i,j) + getBlue(imageData,i,j);
				color = color/3;
				// setPixel(imageData,x,y,r,g,b,a);
				setPixel(imageData,i,j,color,color,color,255);
			}
		}
		ctx.putImageData(imageData,0,0);
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
}
function cambiarSizeCanvas(i){
	if(i < 1000){
		document.getElementById("canvas").style.width = i + 'px';
	}else{
		document.getElementById("canvas").style.width = '1000px';
	}
}


function colorCanvas(){
let red = document.getElementById("inputRed").value;
let green = document.getElementById("inputGreen").value;
let blue = document.getElementById("inputBlue").value;
console.log(red);
if(!colorValido(red)){
	red = 255;
}
if(!colorValido(green)){
	green = 255;
}
if(!colorValido(blue)){
	blue = 255;
}
function colorValido(color){
	return color >= 0 && color <= 255;
}
// ctx.fillStyle = "rgb(red,green,blue;)";
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,100,100);

}
	
	// ctx.beginPath();
	// ctx.arc(450,110,100,Math.PI * 1/2,Math.PI * 3/2);
	// ctx.lineWidth = 15;
	// ctx.lineCap = 'round';
	// ctx.strokeStyle = 'rgba(255,127,0,0.5)';
	// ctx.stroke();







	// var ctx = document.getElementById("canvas").getContext("2d");

//   var imageData;
//   var imagen1 = new Image();
//   imagen1.src = "img.jpg";
//   imagen1.onload = function() {
//     myDrawImageMethod(this);
//     imageData = ctx.getImageData(0, 0, this.width, this.height);
//     let y=0;
//     for(x=0; x<width; x++){
//       setPixel(imageData, x, y, 255, 0,0);
//       y++;
//     }

//     ctx.putImageData(imageData, 0, 0);
//   }

//   function myDrawImageMethod(image){
//     ctx.drawImage(imagen1, 0, 0);
//   }

// function setPixel(imageData, x, y, r, g, b, a){
//   index = (x + y * imageData.width) * 4;
//   imageData.data[index+0] = r;
//   imageData.data[index+1] = g;
//   imageData.data[index+2] = b;
//   imageData.data[index+3] = a;
// }