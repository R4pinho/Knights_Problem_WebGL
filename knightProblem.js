var arr= Array.from(Array(8), () => new Array(8));
var xMove= new Array (2, 1, -1, -2, -2, -1, 1, 2);
var yMove= new Array (1, 2, 2, 1, -1, -2, -2, -1);
var startX;
var startY;
//  Helper functions
//

function getCoordMove (idx){
  if (idx<=0 || idx>64){
    return null;
  }
  for (var x=0; x<8; x++){
    for (var y=0; y<8; y++){
      if (arr[x][y]==idx){
        return [x,y];
      }
    }
  }
}

//----------------------------------------------------------------------------

function isValidMove(x, y) {
  return (x>=0 && x<8 && y>=0 && y<8 && arr[x][y]==0);
}

//----------------------------------------------------------------------------

function getValidMoves(x,y){
  var vm= [];
  for (var i= 0; i<8; i++){
    var nextX= x+ xMove[i];
    var nextY= y+ yMove[i];
    if (isValidMove(nextX, nextY)){
      vm.push([xMove[i],yMove[i]]);
    }
  }
  return vm;
}

//----------------------------------------------------------------------------

function getMovesSortedByNumNextMoves(x,y){
  var validMoves= getValidMoves(x,y);
  var numNextValidMoves= [];
  for (var i= 0; i<validMoves.length; i++){
    var nextX= x+ validMoves[i][0];
    var nextY= y+ validMoves[i][1];
    numNextValidMoves.push([getValidMoves(nextX,nextY).length,validMoves[i][0],validMoves[i][1]]);
  }
  numNextValidMoves.sort(function(a,b){
    return a[0] - b[0];
  });
  return numNextValidMoves;
}
//
//  Algorith functions
//
function solve(initX, initY) {
	startX = initX;
	startY = initY;
  for (var x=0; x<8; x++){
    for (var y=0; y<8; y++){
      arr[x][y]= 0;
    }
  }

  arr[initX][initY]= 1;

  if (solveAux(initX,initY,1) == false){
    console.log("No solution found");
    return false;
  }
  console.log(arr);
  return true;
}

//----------------------------------------------------------------------------

function solveAux(x, y, idx) {
  if (idx==64){
    return true;
  }
  var validMoves= getMovesSortedByNumNextMoves(x,y);
  for (var i= 0; i<validMoves.length; i++){
    var nextX= x+ validMoves[i][1];
    var nextY= y+ validMoves[i][2];
    if (isValidMove(nextX, nextY)){
      arr[nextX][nextY]= idx+1;
      if (solveAux(nextX,nextY,idx+1)){
        return true;
      }
      arr[nextX][nextY]= 0;
    }
  }
  return false;
}
