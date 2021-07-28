/*
* @Author: root
* @Date:   2020-02-04 02:31:22
* @Last Modified by:   H-f-society
* @Last Modified time: 2020-02-22 13:18:35
*/
var GameConfig = function() {
	this.GameMap 	= new Array();
	this.MapSize    = 640;
	this.whiteColor = "#E5C499";
	this.blackColor = "#7F4A38";
	this.ImagePath  = "image/chessman0/";
	this.ImageType  = ".png";
	this.InitChess = [
		[0, 0, new Rook("b")], [0, 1, new Knight("b")], [0, 2, new Bishop("b")], [0, 3, new Queen("b")], [0, 4, new King("b")], [0, 5, new Bishop("b")], [0, 6, new Knight("b")], [0, 7, new Rook("b")],
		[1, 0, new Pawn("b")], [1, 1, new Pawn("b")], 	[1, 2, new Pawn("b")], 	 [1, 3, new Pawn("b")],  [1, 4, new Pawn("b")], [1, 5, new Pawn("b")], 	 [1, 6, new Pawn("b")],   [1, 7, new Pawn("b")],
		[6, 0, new Pawn("w")], [6, 1, new Pawn("w")], 	[6, 2, new Pawn("w")], 	 [6, 3, new Pawn("w")],  [6, 4, new Pawn("w")], [6, 5, new Pawn("w")], 	 [6, 6, new Pawn("w")],   [6, 7, new Pawn("w")],
		[7, 0, new Rook("w")], [7, 1, new Knight("w")], [7, 2, new Bishop("w")], [7, 3, new Queen("w")], [7, 4, new King("w")], [7, 5, new Bishop("w")], [7, 6, new Knight("w")], [7, 7, new Rook("w")]
	];
}
GameConfig.prototype.InitGameMap = function() {
	this.GameMap = new Array(8);
	for(let i=0; i<8; i++) {
		this.GameMap[i] = new Array(8);
		this.GameMap[i].fill("--");
	}
}
GameConfig.prototype.InitLayout = function() {
	let chess = this.InitChess;
	for(let i=0; i<32; i++) {
		this.GameMap[chess[i][0]][chess[i][1]] = chess[i][2];
		draw.drawChess(chess[i][0], chess[i][1], chess[i][2]);
	}
}
GameConfig.prototype.updateMap = function(newPlace, oldPlace) {
	this.GameMap[newPlace[0]][newPlace[1]] = this.GameMap[oldPlace[1]][oldPlace[0]]
	this.GameMap[oldPlace[1]][oldPlace[0]] = "--";
	console.log(this.GameMap);
}
var Draw = function() {
	this.drawMap = function(ctx, MapSize) {
		for(let i=0; i<=8; i++) {
			ctx.moveTo(i*(MapSize/8), 0);
			ctx.lineTo(i*(MapSize/8), MapSize*10);
			ctx.moveTo(0, i*(MapSize/8));
			ctx.lineTo(MapSize*10, i*(MapSize/8));
			ctx.stroke();
			for(let j=0; j<=8; j++) {
				if((i%2==0 && j%2==0) || (i%2!=0 && j%2!=0))
					ctx.fillStyle = config.whiteColor;
				else
					ctx.fillStyle = config.blackColor;
				ctx.fillRect(i*(MapSize/8),j*(MapSize/8),MapSize/8,MapSize/8);
			}
		}
	}
	this.drawChess = function(x, y, chess){
		x = Math.floor(x * config.MapSize / 8);
		y = Math.floor(y * config.MapSize / 8);
		let img = new Image();
		img.src = chess.Image;
		img.onload = function() {
			ctx1.drawImage(img, y, x, config.MapSize/8, config.MapSize/8);
		}
	}
	this.clearchess = function(x, y) {
		x = Math.floor(x * config.MapSize / 8);
		y = Math.floor(y * config.MapSize / 8);
		ctx1.clearRect(x, y, config.MapSize/8, config.MapSize/8);
	}
}

var canvas0 = document.getElementById("box0");
var ctx0 = canvas0.getContext("2d");
var canvas1 = document.getElementById("box1");
var ctx1 = canvas1.getContext("2d");

var config = new GameConfig();
var draw   = new Draw();

canvas0.width  = config.MapSize;
canvas0.height = config.MapSize;
canvas1.width  = config.MapSize;
canvas1.height = config.MapSize;

draw.drawMap(ctx0, config.MapSize);
config.InitGameMap();
config.InitLayout();
console.log(config.GameMap);

var chessName;
var onMouseCount = 0;
var oldPlace = new Array();
canvas1.onmouseup = function(e) {
	let x = Math.floor(e.offsetX/(config.MapSize/8));
	let y = Math.floor(e.offsetY/(config.MapSize/8));
	if(onMouseCount==0) {
		chessName = config.GameMap[y][x];
		oldPlace[0] = x;
		oldPlace[1] = y;
		onMouseCount++;
	}else if(onMouseCount==1 && (config.GameMap[y][x]).Color!=chessName.Color) {
		if(chessName!="--" && chessName.Rules(new Array(y, x), new Array(oldPlace[1], oldPlace[0]), config.GameMap) == true) {
			config.updateMap(new Array(y, x), oldPlace);
			draw.clearchess(oldPlace[0], oldPlace[1]);
			draw.clearchess(x, y);
			draw.drawChess(y, x, chessName);
		}
		onMouseCount = 0;
	}else if(onMouseCount==1 && chessName=="--")
		onMouseCount = 0;
}
