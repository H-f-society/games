/*
* @Author: Administrator
* @Date:   2019-09-27 10:36:48
* @Last Modified by:   root
* @Last Modified time: 2019-10-02 18:53:38
*/

$(document).ready(function(){
	function piece(position, x, y, r, color) {
		position.beginPath();
		position.arc(15+x*30,15+y*30, r, 0, 2*Math.PI);
		position.fillStyle = color;
		position.fill();
		position.stroke();
	}
	canvas1.onclick = function(e) {		// 鼠标点击棋盘落子
		var x = Math.floor(e.offsetX/30);
		var y = Math.floor(e.offsetY/30);
		if(number[x][y] == 0) {
			s_Regrets.push(x, y, flag++);
			show();
			if(flag%2!=0){
				piece(ctx1, x, y, 13, "white");
				$("#now").css("background-image", "url('./image/black.png')");
				number[x][y] = 1;
				str_number(x, y);
			} else{
				piece(ctx1, x, y, 13, "black");
				$("#now").css("background-image", "url('./image/white.png')");
				number[x][y] = -1;
				str_number(x, y);
			}
			show();
		}
	}
});
function str_number(x, y) { //计算单线上已存在的棋子是否有连续的五个同色子
	var str = "", i, j;
	for(i=0; i<=18; i++)
		str = str + number[i][y]; winner(str);
	for(i=0; i<=18; i++)
		str = str + number[x][i]; winner(str);
	if(x <= y) {
		for(i=0,j=y-x; i<19,j<19; i++,j++)
	 		str = str + number[i][j]; winner(str);
	}else {
		for(i=x-y,j=0; i<19,j<(18-(x-y)); i++,j++)
	 		str = str + number[i][j]; winner(str);
	}
	if(x+y <=18) {
		for(i=x+y,j=0; i>=0,j<(x+y); i--,j++)
			str = str + number[i][j]; winner(str);
	}else {
		for(i=18,j=(x+y)-18; i>=(x+y)-18,j<19; i--,j++)
			str = str + number[i][j]; winner(str);
	}
}
function winner(str) {
	if(str.indexOf("-1-1-1-1-1")!=-1) { $("#title").html("黑棋胜利"); }
	if(str.indexOf("11111")!=-1) { $("#title").html("白棋胜利"); }
}