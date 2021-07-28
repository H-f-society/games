/*
* @Author: root
* @Date:   2019-10-04 13:25:45
* @Last Modified by:   H-f-society
* @Last Modified time: 2020-04-14 20:08:20
*/

// var gameMap = new Array(42);
// gameMap.fill(0);
var gameMap = [];
for(let i=0; i<7; i++) {
	gameMap[i] = [];
	for(let j=0; j<6; j++) {
		gameMap[i][j] = '-';
	}
}
$(document).ready(function() {
	// create map
	for(let i=0; i<42; i++) {
		mSpan = document.createElement("span");
		mSpan.id = "map" + i;
		$("#box").append(mSpan);
	}
	for(let i=0; i<6; i++) {
		mSpan = document.createElement("span");
		mSpan.id = "btn" + i;
		$("#btn").append(mSpan);
	}

	// create piece
	var count = 0;
	$("#btn span").each(function() {
		$(this).bind('click', function() {
			let x = Math.floor(parseInt(this.id[3])/6);
			let y = Math.floor(parseInt(this.id[3])%6);
			if(count % 2 == 0) {
				createPiece(x, y, "red");
			}else {
				createPiece(x, y, "yellow");
			}
			console.log(gameMap);
		});
		$(document).unbind('keydown');
		$(document).keydown(function(e)  {
			if(e.keyCode>=96 && e.keyCode<=101) {
				let x = Math.floor(parseInt(this.id[3])/6);
				let y = Math.floor(parseInt(this.id[3])%6);
				if(count % 2 == 0) {
					createPiece(x, y, "red");
				}else {
					createPiece(x, y, "yellow");
				}
			}
		});
	});
	async function createPiece(x, y, color) {
		let num = x;
		while(x <= 6) {
			if(x<6 && gameMap[x+1][y] != '-' && gameMap[x][y] == '-') {
				count++;
				gameMap[x][y] = color[0];
				$("#map" + (x * 6 + y)).css("background-color", color);
				strPiece(x, y)
				console.log(x, y, (x * 6 + y));
				return;
			}
			x++;
			$("#map" + ((x-1) * 6 + y)).css("background-color", "#fff");
			$("#map" + (x * 6 + y)).css("background-color", color);
			await sleep(100);
		}
		if(x==7 && gameMap[x-1][y] == '-') {
			x--;
			count++;
			gameMap[x][y] = color[0];
			$("#map" + (x * 6 + y)).css("background-color", color);
			strPiece(x, y)
		}
		console.log(x, y, (x * 6 + y));
	}
	/*function createPiece(position, color) {
		let num = position;
		while(num <= position+36) {
			if(gameMap[num+6] != 0 && gameMap[num] == 0) {
				count++;
				gameMap[num] = color[0];
				$("#map" + (num)).css("background-color", color);
				strPiece(num, position);
				return;
			}
			num = num + 6;
		}
	}*/
});

function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}

