/*
* @Author: root
* @Date:   2019-04-25 23:25:41
* @Last Modified by:   H-f-society
* @Last Modified time: 2019-05-27 23:24:13
*/
var s_Regrets = new stack();	// 悔棋所需要用到的堆栈
$(document).ready(function() {
	$("#previous").click(function() { previous() });
	$("#next").click(function() { next(); }); 	
	document.onkeydown=function(event){ 
        var e = event || window.event || arguments.callee.caller.arguments[0]; 
        if(e && e.keyCode==9  ){ next(); 	 }
        if(e && e.keyCode==27 ){ previous(); }
    }
    $("#showchess").click(function() { show(); });
    //#########################################

    function previous() { // 悔棋,将堆栈中坐标取出，去除对应棋子
    	var nowX = s_Regrets.popX(), nowY = s_Regrets.popY(), nowNum = s_Regrets.popNum();
		number[nowX][nowY] = 0;
		flag = flag - 1;
		reset_flag(flag_arr);
		ctx1.beginPath();
		ctx1.clearRect(nowX*30, nowY*30, 30, 30);
		if(nowNum%2==0) $("#now").css("background-image", "url('image/white.png')");
		else $("#now").css("background-image", "url('image/black.png')");
    }
    function next() { // 让子
		flag = flag - 1;
		reset_flag(flag_arr);
		if(flag%2==0) $("#now").css("background-image", "url('image/white.png')");
		else $("#now").css("background-image", "url('image/black.png')");
    }
});

function stack() { // 堆栈
	var stackX = [], stackY = [], stackNum = [];			
	this.push  = function(x, y, number) {
		stackX.push(x);
		stackY.push(y);
		stackNum.push(number);
	}
	this.popX    = function() { return stackX.pop(); }
	this.popY    = function() { return stackY.pop(); }
	this.popNum  = function() { return stackNum.pop(); }
	this.isEmpty = function() { return items.length == 0};
}
