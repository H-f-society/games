/*
* @Author: root
* @Date:   2019-10-04 22:06:33
* @Last Modified by:   root
* @Last Modified time: 2019-10-04 23:03:09
*/
var gameMap = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

console.log(gameMap);
$(document).ready(function() {
	// create map
	for(let i=0; i<9; i++) {
		mSpan = document.createElement("span");
		mSpan.id = "map" + i;
		$("#box").append(mSpan);
	}
	var count = 0;
	$("#box span").each(function() {
		$(this).bind('click', function() {
			if($(this).html() === "") {
				let x = Math.floor(parseInt(this.id[3])/3);
				let y = Math.floor(parseInt(this.id[3])%3);
				if(count % 2 == 0) {
					gameMap[x][y] = 'O';
					$(this).html("O");
					$(this).css("color", "red");
				}else {
					gameMap[x][y] = 'X'
					$(this).html("X");
					$(this).css("color", "black");
				}
				count++;
				strPiece(x, y);
			}
			console.log(gameMap);
		});
	});
});