var g = function(id) { return document.getElementById(id); };
var board = [];
var addScore = (function(){
	var score = 0;
	return function(num) {
		score += num;
		g('score').innerText = score;
	}
}())
var bull = bull || {};

(function(root) {
	root.getLeft = function(i, j) {
		return 20 + j*120;
	};

	root.getTop = function(i, j) {
		return 20 + i*120;
	};

	root.noSpace = function() {
		for(var i=0; i<4; i++)
			for(var j=0; j<4; j++)
				if(board[i][j]==0)
					return false;
		return true;
	};

	root.showNumber = function(i, j, number) {
		var ele = $('#number-cell-' + i + '-' + j);
		ele.css('background-color', root.getBackgroundColor(number));
		ele.css('color', root.getNumberColor(number) );
		ele.text( number );
		ele.animate({
			width: '100px',
			height: '100px',
			top: root.getTop(i, j),
			left: root.getLeft(i ,j)
		}, 50);
	}

	root.getBackgroundColor = function(num) {
		switch(num) {
			case 2 : return '#eee4da'; break;
			case 4 : return '#ede0c8'; break;
			case 8 : return '#f2b179'; break;
			case 16 : return '#f59563'; break;
			case 32 : return '#f67c5f'; break;
			case 64 : return '#f65e3b'; break;
			case 128 : return '#edcf72'; break;
			case 256 : return '#edcc61'; break;
			case 512 : return '#99cc00'; break;
			case 1024 : return '#33b5e5'; break;
			case 2048 : return '#0099cc'; break;
			case 4096 : return '#aa66cc'; break;
			case 8192 : return '#9933cc'; break;
		}
		return 'black';
	};

	root.getNumberColor = function(number) {
		if(number <= 4)
			return '#776e65';
		return 'white';
	};
}(bull));


window.onload = function() {

	newGame();
	g('restart').onclick = function() {
		newGame();
	}

	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.keyCode) {
			case 37:
				if( moveLeft() ) {
					setTimeout(generateNumber,210);
					setTimeout(isgameover,360);
				}
				break;
			case 38:
				if( moveUp() ) {
					setTimeout(generateNumber,210);
					setTimeout(isgameover,360);
				}
				break;
			case 39:
				if( moveRight() ) {
					setTimeout(generateNumber,210);
					setTimeout(isgameover,360);
				}
				break;
			case 40:
				if( moveDown() ) {
					setTimeout(generateNumber,210);
					setTimeout(isgameover,360);
				}
				break;
			default:
				break;
		}
		isgameover();
	}
}

function newGame() {
	initGame();

	generateNumber();
	generateNumber();
}

function initGame() {
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++)
			g('grid-cell-'+i+'-'+j).style.cssText = 'left:' + bull.getLeft(i, j) +'px; '
				+ 'top:' + bull.getTop(i,j) + 'px;';

	for(var i=0; i<4; i++) {
		board[i] = [];
		for(var j=0; j<4; j++)
			board[i][j] = 0;
	}
	
	updateView();
}

function createNumber(i, j) {
	var div = document.createElement('div');
	div.className = 'number-cell';
	div.id = 'number-cell-' + i + '-' + j;
	return div;
}

function updateView() {
	$(".number-cell").remove();
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++) {
			g('grid-container').appendChild(createNumber(i,j));
			var ele = g('number-cell-' + i + '-' + j);

			if( board[i][j] ==0 ) {
				ele.style.cssText = 'width:0px; height:0px; '
					+'top:' + bull.getTop(i,j) +'px; '
					+'left:' + bull.getLeft(i,j) +'px;';
			}
			else {
				ele.style.cssText = 'width:100px; height:100px; '
					+'top:' + bull.getTop(i,j) +'px; '
					+'left:' + bull.getLeft(i,j) +'px; '
					+'background-color:' + bull.getBackgroundColor(board[i][j]) +'; '
					+'color:' + bull.getNumberColor(board[i][j]);
				ele.innerText = board[i][j];
			}
		}
}





function generateNumber() {
	
	if( bull.noSpace() ) return false;

	var	rNumber = Math.random() < 0.8 ? 2 : 4;

	do {
		var randx = Math.floor( Math.random() * 4 ),
			randy = Math.floor( Math.random() * 4 );
	}
	while(board[randx][randy] !=0);

	board[randx][randy] = rNumber;
	bull.showNumber(randx, randy, rNumber);
	return true;
}



function noHorizontalBlock(i, k, j) {
	for(var m=k+1; m<j; m++)
		if(board[i][m]!=0)
			return false;
	return true;
}

function noVerticalBlock(i, j, k) {
	for(var m=k+1; m<i; m++)
		if(board[m][j]!=0)
			return false;
	return true;
}

function showMoveAnimation(fromx, fromy, tox, toy) {
	var ele = $('#number-cell-' + fromx + '-' + fromy);
	ele.animate({
		top: bull.getTop(tox, toy),
		left: bull.getLeft(tox ,toy)
	}, 200);
}

function isgameover() {
	 if(!canMoveLeft() && !canMoveRight() && !canMoveUp() && !canMoveDown()) {
	 	g('grid-container').className = 'over';
	 	document.onkeydown = null;
	 }
	 	
}
