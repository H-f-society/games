/*
* @Author: root
* @Date:   2020-02-04 02:30:20
* @Last Modified by:   H-f-society
* @Last Modified time: 2020-02-22 13:53:14
*/
King.prototype.Rules   = function(newPlace, oldPlace, GameMap) {
	if( (Math.abs(oldPlace[0]-newPlace[0])==1 && Math.abs(oldPlace[1]-newPlace[1])==1) ||
		(Math.abs(oldPlace[0]-newPlace[0])==0 && Math.abs(oldPlace[1]-newPlace[1])==1) ||
		(Math.abs(oldPlace[0]-newPlace[0])==1 && Math.abs(oldPlace[1]-newPlace[1])==0)){
		return true;
	}
	return false;
}
Queen.prototype.Rules  = function(newPlace, oldPlace, GameMap) { 
	let dires = getMoveDires(newPlace, oldPlace);
	let x = Math.abs(oldPlace[0]-newPlace[0]);
	let y = Math.abs(oldPlace[1]-newPlace[1]);
	if(dires!="up" && dires!="down" && dires!="left" && dires!="right" && x!=y) return false;
	for(let i=1; i<x; i++) {
		if(dires=="up"	  && GameMap[oldPlace[0]-i][oldPlace[1]]!="--") return false;	
		if(dires=="down"  && GameMap[oldPlace[0]+i][oldPlace[1]]!="--") return false;
	}
	for(let i=1; i<y; i++) {
		if(dires=="left"  && GameMap[oldPlace[0]][oldPlace[1]-i]!="--") return false;	
		if(dires=="right" && GameMap[oldPlace[0]][oldPlace[1]+i]!="--") return false;	
	}
	for(let i=1; i<x; i++) {
		if(dires=="left_up"	   && GameMap[oldPlace[0]-i][oldPlace[1]-i]!="--") return false;
		if(dires=="left_down"  && GameMap[oldPlace[0]+i][oldPlace[1]-i]!="--") return false;
		if(dires=="right_up"   && GameMap[oldPlace[0]-i][oldPlace[1]+i]!="--") return false;		
		if(dires=="right_down" && GameMap[oldPlace[0]+i][oldPlace[1]+i]!="--") return false;	
	}
	return true;
}
Rook.prototype.Rules   = function(newPlace, oldPlace, GameMap) { 
	let dires = getMoveDires(newPlace, oldPlace);
	if(dires!="up" && dires!="down" && dires!="left" && dires!="right") return false;
	let x = Math.abs(oldPlace[0]-newPlace[0]);
	let y = Math.abs(oldPlace[1]-newPlace[1]);
	for(let i=1; i<x; i++) {
		if(dires=="up"	  && GameMap[oldPlace[0]-i][oldPlace[1]]!="--") return false;	
		if(dires=="down"  && GameMap[oldPlace[0]+i][oldPlace[1]]!="--") return false;
	}
	for(let i=1; i<y; i++) {
		if(dires=="left"  && GameMap[oldPlace[0]][oldPlace[1]-i]!="--") return false;	
		if(dires=="right" && GameMap[oldPlace[0]][oldPlace[1]+i]!="--") return false;	
	}
	return true;
}
Bishop.prototype.Rules = function(newPlace, oldPlace, GameMap) { 
	let dires = getMoveDires(newPlace, oldPlace);
	let x = Math.abs(oldPlace[0]-newPlace[0]);
	let y = Math.abs(oldPlace[1]-newPlace[1]);
	if((dires!="left_up" && dires!="left_down" && dires!="right_up" && dires!="right_down")) return false;
	if((dires=="left_up" || dires=="left_down" || dires=="right_up" || dires=="right_down") && x!=y) return false;
	for(let i=1; i<x; i++) {
		if(dires=="left_up"	   && GameMap[oldPlace[0]-i][oldPlace[1]-i]!="--") return false;
		if(dires=="left_down"  && GameMap[oldPlace[0]+i][oldPlace[1]-i]!="--") return false;
		if(dires=="right_up"   && GameMap[oldPlace[0]-i][oldPlace[1]+i]!="--") return false;		
		if(dires=="right_down" && GameMap[oldPlace[0]+i][oldPlace[1]+i]!="--") return false;	
	}
	return true;
}
Knight.prototype.Rules = function(newPlace, oldPlace, GameMap) { 
	let x = oldPlace[0]-newPlace[0];
	let y = oldPlace[1]-newPlace[1];
	if( (x==2&&y==1) || (x==-2&&y==-1) || (x==2&&y==-1) || (x==-2&&y==1) || 
		(x==1&&y==2) || (x==-1&&y==-2) || (x==1&&y==-2) || (x==-1&&y==2) )
		return true;
	return false;
}
Pawn.prototype.Rules   = function(newPlace, oldPlace, GameMap) { 
	if(this.Color == "w") {		
		if(((oldPlace[0]-newPlace[0]==1 && oldPlace[1]-newPlace[1]==1) || 
			(oldPlace[0]-newPlace[0]==1 && oldPlace[1]-newPlace[1]==-1)) && 
			GameMap[newPlace[0]][newPlace[1]]!="--") {
			return true;		
		}
		if( this.MoveCount==0 && 
			oldPlace[0]-newPlace[0]==2 && oldPlace[1]-newPlace[1]==0 &&
			GameMap[oldPlace[0]-1][oldPlace[1]]=="--" && GameMap[oldPlace[0]-2][oldPlace[1]]=="--" ){	
			this.MoveCount++;
			return true;	
		}
		if( oldPlace[0]-newPlace[0]==1 && oldPlace[1]-newPlace[1]==0 && GameMap[oldPlace[0]-1][oldPlace[1]]=="--") {
			this.MoveCount++;
			return true;
		}
	}
	if(this.Color == "b") {
		if(((newPlace[0]-oldPlace[0]==1 && newPlace[1]-oldPlace[1]==1) || 
			(newPlace[0]-oldPlace[0]==1 && newPlace[1]-oldPlace[1]==-1)) && 
			GameMap[newPlace[0]][newPlace[1]]!="--") {
			return true;
		}
		if( this.MoveCount==0 && 
			newPlace[0]-oldPlace[0]==2 && newPlace[1]-oldPlace[1]==0 && 
			GameMap[oldPlace[0]+1][oldPlace[1]]=="--" && GameMap[oldPlace[0]+2][oldPlace[1]]=="--" ){
			this.MoveCount++;
			return true;			
		}
		if( newPlace[0]-oldPlace[0]==1 && newPlace[1]-oldPlace[1]==0 && GameMap[oldPlace[0]+1][oldPlace[1]]=="--") {
			this.MoveCount++;
			return true;
		}
	}
	function updateRole() {
		var box = document.getElementById("updateRole");
		box.setAttribute("display", "inline");
	}
	return false;
}
function getMoveDires(newPlace, oldPlace) {
	let dires;
	let x = newPlace[0] - oldPlace[0];
	let y = newPlace[1] - oldPlace[1];
	
	if(x<0 && y==0) dires = "up";
	if(x>0 && y==0) dires = "down";
	if(x==0 && y<0) dires = "left";
	if(x==0 && y>0) dires = "right";
	if(x<0 && y<0)  dires = "left_up";
	if(x>0 && y<0)  dires = "left_down";
	if(x<0 && y>0)	dires = "right_up";
	if(x>0 && y>0)	dires = "right_down";
	return dires;
}