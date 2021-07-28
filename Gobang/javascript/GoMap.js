/*
* @Author: Administrator
* @Date:   2019-09-27 09:02:08
* @Last Modified by:   Administrator
* @Last Modified time: 2019-09-27 17:59:19
*/
var blackImg = new Image();
var whiteImg = new Image();
blackImg.src = "../Image/black.png";
whiteImg.src = "../Image/white.png";
var flag     = 1;
var number = [],
	flag_up    = [],
	flag_down  = [],
	flag_left  = [],
	flag_right = [];
var ctx, ctx1, canvas, canvas1;
for(var i=0; i<19; i++) {
	number[i]     = [];
	flag_up[i]    = [];
	flag_down[i]  = [];
	flag_left[i]  = [];
	flag_right[i] = [];
	for(var j=0; j<19; j++) {
		number[i][j]     = 0;
		flag_up[i][j]    = 0;
		flag_down[i][j]  = 0;
		flag_left[i][j]  = 0;
		flag_right[i][j] = 0;
	}
}
function show() {
	console.clear();
	for(var i=0; i<19; i++) {
		var s = "";
		for(var j=0; j<19; j++) {
			s = s + number[j][i] +"  ";
		}
		console.log(s+" "+i);
	}
}
$(document).ready(function(){
	canvas  = document.getElementById("box");
	ctx     = canvas.getContext("2d");
	canvas1 = document.getElementById("box1");
	ctx1    = canvas1.getContext("2d");
	for(var i=0; i<19; i++) {	// 绘制围棋棋盘网格
		ctx.moveTo(15+i*30, 15);
		ctx.lineTo(15+i*30, 555);
		ctx.moveTo(15, 15+i*30);
		ctx.lineTo(555, 15+i*30);
		ctx.stroke();
	}
	function piece(position, x, y, r, color) {
		position.beginPath();
		position.arc(15+x*30,15+y*30, r, 0, 2*Math.PI);
		position.fillStyle = color;
		position.fill();
		position.stroke();
	}
	piece(ctx, 3 , 3 , 5, "black"); 	// 绘制棋盘上的8个星位、1个天元
	piece(ctx, 15, 3 , 5, "black");
	piece(ctx, 3 , 15, 5, "black");
	piece(ctx, 15, 15, 5, "black");
	piece(ctx, 9 , 9 , 5, "black");
	piece(ctx, 3 , 9 , 5, "black");
	piece(ctx, 9 , 3 , 5, "black");
	piece(ctx, 15, 9 , 5, "black");
	piece(ctx, 9 , 15, 5, "black");
});