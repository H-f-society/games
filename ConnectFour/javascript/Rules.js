/*
* @Author: root
* @Date:   2019-10-04 13:47:32
* @Last Modified by:   root
* @Last Modified time: 2019-10-05 15:32:31
*/
/*function strPiece(num, position) {
	let str = "", n = num-position;

	var left_up = num, p = position;
	var right_bottom;
	while(left_up != n && left_up != p) {
		p--;
		n = n - 6;
		left_up = left_up - 7;
	}
	console.log(num, left_up, p);

	for(let i=num-position; i<num-position+6; i++)
		str = str + gameMap[i]; Winner(str);
	for(let i=position; i<=position+36; i=i+6)
		str = str + gameMap[i]; Winner(str);
	for(let i=left_up; i<=(5-p)*7+1; i=i+7)
		str = str + gameMap[i]; Winner(str);
	console.log(str);
	
}*/
function strPiece(x, y) {
	var str = "";

	for(let i=0; i<6; i++)
		str = str + gameMap[x][i]; 
	Winner(str);
	str = "";
	for(let i=0; i<7; i++)
		str = str + gameMap[i][y]; 
	Winner(str);
	str = "";

	if(x-y >=0) {
		for(let i=x-y, j=0; i<7; i++, j++	)
			str = str + gameMap[i][j]; 
		Winner(str);
	}else{
		for(let i=y-x, j=0; i<6; i++, j++	)
			str = str + gameMap[j][i]; 
		Winner(str);
	}
	str = "";
	if(x+y < 7) {
		for(let i=x+y, j=0; i>=0; i--, j++)
			str = str + gameMap[i][j]; 
		Winner(str);
	}else {
		for(let i=x+y-6, j=6; i<6; i++, j--)
			str = str + gameMap[j][i]; 
		Winner(str);
	}
}
function Winner(str) {
	console.log(str);
	if(str.indexOf("rrrr")!=-1) { console.log("RED WINNER!"); }
	if(str.indexOf("yyyy")!=-1) { console.log("YELLOW WINNER!"); }	str = "";
}
/*
00 01 02 03 04 05
06 07 08 09 10 11
12 13 14 15 16 17
18 19 20 21 22 23
24 25 26 27 28 29
30 31 32 33 34 35
36 37 38 39 40 41

00 01 02 03 04 05
10 11 12 13 14 15
20 21 22 23 24 25
30 31 32 33 34 35
40 41 42 43 44 45
50 51 52 53 54 55
60 61 62 63 64 65

20 - (2 * 7) = 6
26 - (2 * 7) = 12
25 - (1 * 7) = 18

15 - 1 = 14 = (15 - 3) / 6 * 7 = 2 * 7 = 14

0/6, 1/6, 2/6, 3/6, 4/6, 5/6
0%6, 1%6, 2%6, 3%6, 4%6, 5%6
*/