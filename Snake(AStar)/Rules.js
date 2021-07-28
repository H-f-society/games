/*
* @Author: root
* @Date:   2020-06-07 00:25:13
* @Last Modified by:   root
* @Last Modified time: 2020-06-07 05:33:06
*/
var GameConfig = function() {
	this.MapSize   = 5;
	this.MoveDires = [1, 0];
	this.MoveSpeed = 10;
	this.SnakeSize = 4;
	this.headColor = "red";
	this.bodyColor = "white";
	this.foodColor = "yellow";

	this.Body = new Array();
	this.Food = new Array();
	this.GameMap = new Array(this.MapSize);

	var draw   = new Draw(ctx);
}
GameConfig.prototype.InitGameMap = function() {
	for(let i=0; i<this.MapSize; i++) {
		this.GameMap[i] = new Array(this.MapSize);
		this.GameMap[i].fill("-");
	}
}
GameConfig.prototype.InitSnakeBody = function() {
	return this.Body = [[1, 0], [0, 0]];
}
GameConfig.prototype.InitSnake = function() {
	let body = this.Body;
	for(let i=0; i<body.length; i++) {
		draw.drawRole(body[i][0]+0.5, body[i][1]+0.5, this.SnakeSize, this.bodyColor);
		this.GameMap[body[i][1]][body[i][0]] = "*";
	}
	draw.drawRole(body[0][0]+0.5, body[0][1]+0.5, this.SnakeSize, this.headColor);
}
GameConfig.prototype.createFood = function() {
	this.Food[0] = parseInt((Math.random()*config.MapSize).toString(10));
	this.Food[1] = parseInt((Math.random()*config.MapSize).toString(10));
	if(this.GameMap[this.Food[0]][this.Food[1]] == "-") {
		this.GameMap[this.Food[0]][this.Food[1]] = "0";
		draw.drawRole(this.Food[0]+0.5, this.Food[1]+0.5, this.SnakeSize, this.foodColor);

		NextPath(this.Body[0], this.Food);
	}else {
		this.createFood();
	}
}
GameConfig.prototype.MoveSnake = function(direction) {
	var head = this.Body[0];
	switch(direction) {
		case "U": this.MoveDires = [0, -1]; break;
		case "D": this.MoveDires = [0, 1];  break;
		case "L": this.MoveDires = [-1, 0]; break;
		case "R": this.MoveDires = [1, 0];  break;
	}
	let x = head[0] + this.MoveDires[0];
	let y = head[1] + this.MoveDires[1];
	if(!this.isTransboundary(x, y) || this.GameMap[x][y]=="*") {
		console.log(x, y);
		console.log("Game Over!");
		return;
	}
	if(this.isTransboundary(x, y) && (this.GameMap[x][y]=="-" || this.GameMap[x][y]=="0")) {
		let tail = (this.Body).pop();	// clear old tail;
		this.eatFood(x, y, tail);
		this.Body.unshift(new Array(x, y)); // insert new head;
		this.reMap(new Array(x, y), tail); // update game map;
		this.reDrawSnake(new Array(x, y), this.Body[1], tail);
	}
}
GameConfig.prototype.reDrawSnake = function(newHead, oldHead, clearTail) {
	draw.drawRole(newHead[0]+0.5, newHead[1]+0.5, this.SnakeSize, this.headColor);
	draw.drawRole(oldHead[0]+0.5, oldHead[1]+0.5, this.SnakeSize, this.bodyColor);
	draw.clearRole(clearTail[0]+0.5, clearTail[1]+0.5);
}
GameConfig.prototype.isTransboundary = function(x, y) {
	if(x>=0 && x<this.MapSize && y>=0 && y<this.MapSize) 
		return true;
	return false;
}
GameConfig.prototype.reMap = function(newHead, clearTail) {
	this.GameMap[newHead[0]][newHead[1]]   = "*";
	this.GameMap[clearTail[0]][clearTail[1]] = "-";	
}
GameConfig.prototype.eatFood = function(x, y, tail) {
	if(this.GameMap[x][y] == "0") {
		this.Body.push(tail);
		draw.drawRole(tail[0]+0.5, tail[1]+0.5, this.SnakeSize, this.bodyColor);
		this.createFood();
	}
}

GameConfig.prototype.AStar = function(start, end) {
	var Pos = function(point) {
		this.ps = point;
		this.f; this.g; this.h;
		this.parent;
	}
	return searchPath();
	function searchPath() {
		var dires  = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		var result = new Array();
		var flag   = new Array();
		var que    = new Array();

		que.unshift(new Pos(start));
		flag.unshift("x:"+start[0]+",y:"+start[1]);
		while(que.length != 0) {
			var nowPoint = que.pop();
			if(nowPoint.ps[0] == end[0] && nowPoint.ps[1] == end[1]) {
				do {
					result.unshift(nowPoint.ps);
					nowPoint = nowPoint.parent;
				}while(nowPoint.ps[0] != start[0] || nowPoint.ps[1] != start[1]);
				result.unshift(nowPoint.ps);
				return result;
			}
			for(let i=0; i<4; i++) {
				let x = nowPoint.ps[0] + dires[i][0];
				let y = nowPoint.ps[1] + dires[i][1];
				var pos = new Pos(new Array(x, y));

				if( config.isTransboundary(x, y) && config.GameMap[x][y]!='*' && flag.indexOf("x:"+x+",y:"+y)==-1) {					
					pos.g = nowPoint.g==undefined ? 10 : nowPoint.g + 10;
					pos.h = Math.abs(pos.ps[0] - end[0]) * Math.abs(pos.ps[1] - end[1]);
					pos.f = pos.g + pos.h;
					pos.parent = nowPoint;
					que.unshift(pos);
					flag.unshift("x:"+x+",y:"+y);
				}
			}
			for(let i=0; i<que.length; i++) {
				if(que[i].f < que[0].f) {
					let tmp = que[i];
					que[i]  = que[0];
					que[0]  = tmp;
				}
			}
		}
		return result;
	}
}
var Draw = function(ctx) {
	this.drawRole = function(x, y, r, color) {
		ctx.beginPath();
		ctx.arc(x*10,y*10, r, 0, 2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
	}
	this.clearRole = function(x, y) {
		ctx.clearRect((x-0.5)*10, (y-0.5)*10, 10.5, 10.5);
	}
}
var canvas = document.getElementById("GameBox");
var ctx = canvas.getContext("2d");

var config = new GameConfig();
var draw   = new Draw(ctx);

canvas.width  = config.MapSize * 10;
canvas.height = config.MapSize * 10;

config.InitGameMap();
config.InitSnakeBody();
config.InitSnake();
config.createFood();


async function NextPath(start, end) {
	var path  = config.AStar(start, end);
	console.log(path);
	for(let i=0; i<path.length; i++) {
		var x = path[i][0] - config.Body[0][0];
		var y = path[i][1] - config.Body[0][1];
		if(x == -1 && y==0) config.MoveSnake("L");
		if(x == 1 && y==0)  config.MoveSnake("R");
		if(x == 0 && y==-1) config.MoveSnake("U");
		if(x == 0 && y==1)  config.MoveSnake("D");
		await sleep(config.MoveSpeed);
	}
}

document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 37) config.MoveSnake("L");
	if(e && e.keyCode == 38) config.MoveSnake("U");
	if(e && e.keyCode == 39) config.MoveSnake("R");
	if(e && e.keyCode == 40) config.MoveSnake("D");
}
function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    });
}