"use strict";
let juego = document.getElementsByTagName("body")[0];
juego.addEventListener("keydown",detectKey);
let player = document.getElementById("player");
let jumping = false;
let collidingObjs = [];
let contObjs = 0;
let lifeCounter = 0;
let inter = null;
let alive = false;
let timeColl = null;
let score = 0;
let timeScore = null;

function detectKey(event){
	let key = event.code;
	if(isAlive()){
		if(key == "Space" && !jumping){
			console.log(key);
			jumping = true;
			jump()
		}
		if(key == "KeyE"){
			generateEnemy();
		}
	}
	if(key == "KeyS"){
		startGame();
		generateEnemy();
	}
	if(key == "KeyW"){
		stopGame();
		gameOver();
	}
}
function startGame(){
	console.log("GAME STARTED");
	alive = true;
	lifeCounter = 3;
	score = 0;
	generateHealthBar();
	increaseScore();
	player.style.background = "url('spritesheets/sans/sansWalkSmall.png')";
	run();
	document.getElementsByClassName("back")[0].style.animation = "playFront 25s linear infinite";
	document.getElementsByClassName("back-light")[0].style.animation = "playFront 20s linear infinite";
	document.getElementsByClassName("middle")[0].style.animation = "playFront 10s linear infinite";
	document.getElementsByClassName("grass")[0].style.animation = "playFront 5s linear infinite";
	document.getElementsByClassName("front")[0].style.animation = "playFront 5s linear infinite";
}
function stopGame(){
	console.log("GAME FINISHED");
	player.style.animation = "";
	document.getElementsByClassName("back")[0].style.animation = "";
	document.getElementsByClassName("back-light")[0].style.animation = "";
	document.getElementsByClassName("middle")[0].style.animation = "";
	document.getElementsByClassName("grass")[0].style.animation = "";
	document.getElementsByClassName("front")[0].style.animation = "";
}
function starCollision(){
	player.style.background = "url('spritesheets/sans/sansCollisionSmallExtra.png')";
	timeColl = setTimeout(stopCollision,1000);
}
function stopCollision(){
	player.style.background = "url('spritesheets/sans/sansWalkSmall.png')";
	clearTimeout(timeColl);
	timeColl = null;
}
let timeRun = null;
let timeEndJump = null;
function jump(){
	player.style.animation = "jump 0.5s";
	if(isAlive()){
		timeRun = setTimeout(run, 450);
		timeEndJump =setTimeout(finishJump, 800);
	}
}
function isAlive(){
	return alive;
}
function run(){
	player.style.animation = "run 0.5s steps(4) infinite";
	clearTimeout(timeRun);
	timeRun = null;
}
function death(){
	player.style.background = "url('spritesheets/sans/sansDeathBWSmall.png')";
	player.style.animation = " !important";
}
function finishJump(){
	jumping = false;
	clearTimeout(timeEndJump);
	timeEndJump = null;
}

function generateEnemy(){
	let enemies = document.getElementsByClassName("enemies")[0];
	let div = document.createElement("div");
	div.classList.add("enemy");
	enemies.appendChild(div);
	// consoleCoords(div);
	collidingObjs[contObjs] = new CollidingEnemy(div);
	contObjs++;
	// inter = setInterval(checkCollision,1000);
	timedCheckCollision();
}
function timedCheckCollision(){
	checkCollision();
	setTimeout(timedCheckCollision,1000);
}
function checkCollision(){
	let playerBound = player.getBoundingClientRect();
	let playerPos = {
		top: playerBound.top,//distance from the top
		bottom: playerBound.top + playerBound.height,//top plus height
		left: playerBound.left,//distance from the left
		right: playerBound.left + playerBound.width//left plus width
	};
	collidingObjs.forEach(elem => {
		let elemBound = elem.getDiv().getBoundingClientRect();
		let objPos = {
			top: elemBound.top,
			bottom: elemBound.top + elemBound.height,
			left: elemBound.left,
			right: elemBound.left + elemBound.width
		};
		if(overlap(playerPos,objPos)){
			lifeCounter--;
			if(lifeCounter == 0){
				stopGame();
				gameOver();
				death();
				elem.collide();
			}else{
				starCollision();
				console.log("COLLISION!!!!!!");
				elem.collide();
			}
			console.log("Life Counter: "+lifeCounter);
		}
	});
}
function overlap(p1,p2){
	return ((p1.left <= p2.right && p1.right >= p2.left) &&
			(p1.top <= p2.bottom && p1.bottom >= p2.top));
}
function gameOver(){
	alive = false;
	let enemies = document.getElementsByClassName("enemies")[0];
	while (enemies.hasChildNodes()) {  
		enemies.removeChild(enemies.firstChild);
	}
	stopScore();
	// clearInterval(inter);
	inter = null;
	// player.style.animation = "";
}
function consoleCoords(e){
	console.log("T: "+e.getBoundingClientRect().top);
	console.log("L: "+e.getBoundingClientRect().left);
	console.log("H: "+e.getBoundingClientRect().height);
	console.log("W: "+e.getBoundingClientRect().width);
}
function generateHealthBar(){
	deleteOldHearts();
	let bar = document.getElementsByClassName("healthBar")[0];
	let max = lifeCounter;
	for(let i=0; i<max;i++){
		console.log("heart generated!");
		let divHeart = document.createElement("div");
		divHeart.classList.add("heart");
		bar.appendChild(divHeart);
	}
}
function deleteOldHearts(){
	let enemies = document.getElementsByClassName("healthBar")[0];
	while (enemies.hasChildNodes()) {  
		enemies.removeChild(enemies.firstChild);
	}
}
function increaseScore(){
	score++;
	generateScore();
	timeScore = setTimeout(increaseScore,1000);
}
function generateScore(){
	deleteOldScores();
	let sc = "";
	sc = score.toString();
	let arr = sc.split("");
	let bar = document.getElementsByClassName("scoreBar")[0];
	arr.forEach(ele => {
		let divScore = document.createElement("div");
		divScore.classList.add("score");
		divScore.style.background = "url('"+getImgFromNumber(ele)+"')";
		bar.appendChild(divScore);
	});
}
function deleteOldScores(){
	let enemies = document.getElementsByClassName("scoreBar")[0];
	while (enemies.hasChildNodes()) {  
		enemies.removeChild(enemies.firstChild);
	}
}
function stopScore(){
	clearInterval(timeScore);
}
function getImgFromNumber(n){
	let root = "spritesheets/font/numbers/";
	switch(n){
		case "0": return root+"0.png";break;
		case "1": return root+"1.png";break;
		case "2": return root+"2.png";break;
		case "3": return root+"3.png";break;
		case "4": return root+"4.png";break;
		case "5": return root+"5.png";break;
		case "6": return root+"6.png";break;
		case "7": return root+"7.png";break;
		case "8": return root+"8.png";break;
		case "9": return root+"9.png";break;
	}
}
function reduceHealtBar(){
	let healthBar = document.getElementsByClassName("healthBar")[0];
	console.log(healthBar.children.length);
	for (let i = 0; i < healthBar.children.length; i++) {
		if(i == lifeCounter){
			let c = healthBar.children[i];
			c.style.background = "url('spritesheets/heart/newHeartGrey.png')";
		}
	}
}
class CollidingObj{
	constructor(div){
		this.div = div;
		// if(this.constructor == CollidingObj){
		// 	throw new Error("Abstract class can't be instantiated");
		// }
	}
	collide(){
		throw new Error("Method 'collide' must be implemented");
	}
	getDiv(){
		return this.div;
	}
}
class CollidingPowerUp extends CollidingObj{
	constructor(div){
		super(div);
	}
	collide(){
		//regenerate life bar
	}
}
class CollidingEnemy extends CollidingObj{
	constructor(div){
		super(div);
	}
	collide(){
		//reduce life bar
		console.log("reduce life bar");
		reduceHealtBar();
	}
}