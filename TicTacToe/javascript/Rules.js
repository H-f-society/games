/*
* @Author: root
* @Date:   2019-10-04 22:53:40
* @Last Modified by:   root
* @Last Modified time: 2019-10-04 23:10:58
*/
function strPiece(x, y) {
	var str = "";
	for(let i=0; i<3; i++)
		str = str + gameMap[i][y]; Winner(str); str = "";
	for(let i=0; i<3; i++)
		str = str + gameMap[x][i]; Winner(str); str = "";
	for(let i=0, j=0; i<3, j<3; i++, j++)
		str = str + gameMap[i][j]; Winner(str); str = "";
	for(let i=2, j=0; i>=0, j<3; i--, j++)
		str = str + gameMap[i][j]; Winner(str); str = "";
	console.log(str);
}
function Winner(str) {
	if(str.indexOf("OOO")!=-1) { console.log("OO WINNER!"); }
	if(str.indexOf("XXX")!=-1) { console.log("XX WINNER!"); }
}