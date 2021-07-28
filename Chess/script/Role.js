/*
* @Author: root
* @Date:   2020-02-07 04:36:09
* @Last Modified by:   H-f-society
* @Last Modified time: 2020-03-17 04:34:00
*/
var ImagePath = "image/chessman0/";
var ImageType = ".png";
var King = function(color) {
	this.Name = "K";
	this.MoveCount = 0;
	this.Color = color;
	this.Image = ImagePath + this.Color + this.Name + ImageType;
}
var Queen = function(color) {
	this.Name = "Q";
	this.MoveCount = 0;
	this.Color = color;
	this.Image = ImagePath + this.Color + this.Name + ImageType;
}
var Rook = function(color) {
	this.Name = "R";
	this.MoveCount = 0;
	this.Color = color;
	this.Image = ImagePath + this.Color + this.Name + ImageType;
}
var Bishop = function(color) {
	this.Name = "B";
	this.MoveCount = 0;
	this.Color = color;
	this.Image = ImagePath + this.Color + this.Name + ImageType;
}
var Knight = function(color) {
	this.Name = "N";
	this.MoveCount = 0;
	this.Color = color;
	this.Image = ImagePath + this.Color + this.Name + ImageType;
}
var Pawn = function(color) {
	this.Name = "P";
	this.MoveCount = 0;
	this.Color = color;
	this.Image = ImagePath + this.Color + this.Name + ImageType;
}
King.prototype.setMoveCount   = function(n) { this.MoveCount = n; }
Queen.prototype.setMoveCount  = function(n) { this.MoveCount = n; }
Rook.prototype.setMoveCount   = function(n) { this.MoveCount = n; }
Bishop.prototype.setMoveCount = function(n) { this.MoveCount = n; }
Knight.prototype.setMoveCount = function(n) { this.MoveCount = n; }
Pawn.prototype.setMoveCount   = function(n) { this.MoveCount = n; }
