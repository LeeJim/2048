function moveLeft() {
	if( !canMoveLeft() ) return false;
	for(var i=0; i<4; i++)
		for(var j=1; j<4; j++) {
			if(board[i][j]!=0) {
				for(var k=0; k<j; k++) {
					if(board[i][k]==0 && noHorizontalBlock(i, k, j) ) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[i][k]==board[i][j] && noHorizontalBlock(i, k, j) ) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						addScore(board[i][k]);
						board[i][j] = 0;
						break;
					}
				}
			}
		}
	setTimeout(updateView,200);
	return true;
}

function moveRight() {
	if( !canMoveRight() ) return false;
	for(var i=0; i<4; i++)
		for(var j=2; j>=0; j--) {
			if(board[i][j]!=0) {
				for(var k=3; k>j; k--) {
					if(board[i][k]==0 && noHorizontalBlock(i, j, k) ) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[i][k]==board[i][j] && noHorizontalBlock(i, j, k) ) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						addScore(board[i][k]);
						board[i][j] = 0;
						break;
					}
				}
			}
		}
	setTimeout(updateView,200);
	return true;
}

function moveUp() {
	if( !canMoveUp() ) return false;
	for(var i=1; i<4; i++)
		for(var j=0; j<4; j++) {
			if(board[i][j]!=0) {
				for(var k=0; k<i; k++) {
					if(board[k][j]==0 && noVerticalBlock(i, j, k) ) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[k][j]==board[i][j] && noVerticalBlock(i, j, k) ) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						addScore(board[k][j]);
						board[i][j] = 0;
						break;
					}
				}
			}
		}
	setTimeout(updateView,200);
	return true;
}

function moveDown() {
	if( !canMoveDown() ) return false;
	for(var i=3; i>=0; i--)
		for(var j=0; j<4; j++) {
			if(board[i][j]!=0) {
				for(var k=3; k>i; k--) {
					if(board[k][j]==0 && noVerticalBlock(k, j, i) ) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[k][j]==board[i][j] && noVerticalBlock(k, j, i) ) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						addScore(board[k][j]);
						board[i][j] = 0;
						break;
					}
				}
			}
		}
	setTimeout(updateView,200);
	return true;
}

function canMoveLeft() {
	for(var i=0; i<4; i++)
		for(var j=1; j<4; j++)
			if(board[i][j]!=0)
				if(board[i][j-1] ==0 || board[i][j-1] == board[i][j])
					return true;
	return false;
}

function canMoveRight() {
	for(var i=0; i<4; i++)
		for(var j=0; j<3; j++)
			if(board[i][j]!=0)
				if(board[i][j+1] ==0 || board[i][j+1] == board[i][j])
					return true;
	return false;
}

function canMoveUp() {
	for(var i=1; i<4; i++)
		for(var j=0; j<4; j++)
			if(board[i][j]!=0)
				if(board[i-1][j] ==0 || board[i-1][j] == board[i][j])
					return true;
	return false;
}

function canMoveDown() {
	for(var i=0; i<3; i++)
		for(var j=0; j<4; j++)
			if(board[i][j]!=0)
				if(board[i+1][j] ==0 || board[i+1][j] == board[i][j])
					return true;
	return false;
}
