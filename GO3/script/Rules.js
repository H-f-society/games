/*
* @Author: H-f-society
* @Date:   2020-03-12 11:47:59
* @Last Modified by:   H-f-society
* @Last Modified time: 2020-03-22 19:21:13
*/
var GameConfig = function() {
	this.ImagePath = "image/style1/";
	this.ImageType = ".png";
	this.MapSize   = 570;
	this.dires     = [[1, 0], [-1, 0], [0, 1], [0, -1]];
	this.GameMap   = new Array(19).fill(new Array(19)).map(x=>{return Array.from(x).fill(0)});
	this.ChessTempStack = new Array();
}
GameConfig.prototype.setGameMap = function(x, y, role) { this.GameMap[x][y] = role; }
GameConfig.prototype.eatChess = function(X, Y, role) {
	var result = false;
	for(let i=0; i<4; i++) {
		var x = X + this.dires[i][0];
		var y = Y + this.dires[i][1];
		if(this.Transboundary(x, y) && this.GameMap[x][y] == role) {
			if(!this.isLiberty(x, y, role))
				eat();
			this.ChessTempStack = new Array();
		}
	}
	function eat() {
		for(let i=0; i<config.ChessTempStack.length; i++) {
			let ps = config.ChessTempStack.shift();
			config.GameMap[ps[0]][ps[1]] = 0;
			draw.clearRole(ps[1], ps[0]);
		}
		result = true;
	}
	return result;
}
GameConfig.prototype.isLiberty = function(x, y, role) {
	var flag = new Array(19).fill(new Array(19)).map(x=>{return Array.from(x).fill(0)});
	var que  = new Array();
	que.push(new Array(x, y));
	flag[x][y] = role;
	this.ChessTempStack.push(new Array(x, y));
	while(que.length != 0) {
		var ps = que.shift();

		for(let i=0; i<4; i++) {
			var x = ps[0] + this.dires[i][0];
			var y = ps[1] + this.dires[i][1];
			if(this.Transboundary(x, y) && this.GameMap[x][y]==0) {
				this.ChessTempStack = new Array();
				return true;
			}
			if(this.Transboundary(x, y) && this.GameMap[x][y]==role && flag[x][y]==0) {
				que.push(new Array(x, y));
				flag[x][y] = role;
				this.ChessTempStack.push(new Array(x, y));
			}
		}
	}
	return false;
}
GameConfig.prototype.Transboundary = function(x, y) {
	if(x>=0 && x<19 && y>=0 && y<19)
		return true;
	else return false;
}
var Draw = function() {
	this.drawMap = function(ctx, MapSize) {
		var gridSize = (MapSize/19);
		for(let i=0; i<=19; i++) {
			ctx.moveTo((gridSize/2)+i*gridSize, (gridSize/2));
			ctx.lineTo((gridSize/2)+i*gridSize, (MapSize-(gridSize/2)));
			ctx.moveTo((gridSize/2), (gridSize/2)+i*gridSize);
			ctx.lineTo((MapSize-(gridSize/2)), (gridSize/2)+i*gridSize);
			ctx.stroke();
		}
	}
	this.drawRole = function(x, y, role) {
		let size = config.MapSize / 19;
		let img = new Image();
		img.src = config.ImagePath + role + config.ImageType;
		img.onload = function() {
			ctx2.drawImage(img, x*size, y*size, size, size);
		}
	}
	this.clearRole = function(x, y) {
		let size = config.MapSize / 19;
		ctx2.clearRect(x*size, y*size, size, size);
	}
}

var canvas1 = document.getElementById("box1");
var canvas2 = document.getElementById("box2");
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");

var config = new GameConfig();
var draw = new Draw();

GameStyle();
function GameStyle() {
	canvas1.width  = config.MapSize;
	canvas2.width  = config.MapSize;
	canvas1.height = config.MapSize;
	canvas2.height = config.MapSize;
	$("#box1").css("background-image", "url("+config.ImagePath+"background.jpg)");
}

draw.drawMap(ctx1, config.MapSize);

var clickCount = 0;
var nowRole = 'b';
canvas2.onmouseup = function(e) {
	let x = Math.floor(e.offsetY/(config.MapSize/19));
	let y = Math.floor(e.offsetX/(config.MapSize/19));
	
	if(clickCount % 2 == 0) {
		if(config.GameMap[x][y]==0) {
			config.setGameMap(x, y, nowRole);
			if(config.eatChess(x, y, 'w') || config.isLiberty(x, y, nowRole)) {
				draw.drawRole(y, x, nowRole);
				nowRole = 'w';
				clickCount++;
			}else {
				config.setGameMap(x, y, 0);
			}
		}
	}else {
		if(config.GameMap[x][y]==0) {
			config.setGameMap(x, y, nowRole);
			if(config.eatChess(x, y, 'b') || config.isLiberty(x, y, nowRole)) {
				draw.drawRole(y, x, nowRole);
				nowRole = 'b';
				clickCount++;
			}else {
				config.setGameMap(x, y, 0);
			}
		}
	}
}
document.onkeydown=function(event){ 
    var e = event || window.event || arguments.callee.caller.arguments[0]; 
    if(e && e.keyCode==9  ){ next(); 	 }
    if(e && e.keyCode==27 ){ previous(); }
}
function next() { // 让子
	clickCount = clickCount - 1;
	if(clickCount%2==0) nowRole = 'b';
	else nowRole = 'w';
}