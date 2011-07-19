Chess.AI["chapter3"] = function(game, color) {
	var values = {
		p: -1,
		P: 1,
		b: -3,
		B: 3,
		n: -3,
		N: 3,
		r: -5,
		R: 5,
		q: -9,
		Q: 9,
		k: 0,
		K: 0
	};
	
	function scoreForGame(game) {
		if (game.in_checkmate()) { return color == 'b' ? -1000 : 1000; }

		var fen = game.fen().split(" ")[0];
		var score = 0;
		for (var i=0; i<fen.length; i++) {
			score += values[fen[i]] || 0;
		}
		return score;
	}
	
	function chooseMove(game, color, ply) {
		var moves = game.moves();
		var move;
		var topScore;

		for (var i=0; i<moves.length; i++) {
			var newGame = Chess.Game.create(game.fen());

			newGame.move(moves[i]);
			if (ply > 1) {
				newGame.move(chooseMove(newGame, color == 'w' ? 'b' : 'w', ply - 1));
			}

			var score = scoreForGame(newGame);
			var noTopScore = topScore === undefined;
			var replaceEqual = (topScore == score) && (Math.random() > 0.85);
			var betterScore = (color == 'w' && score > topScore) || (color == 'b' && score < topScore);

			if (noTopScore || replaceEqual || betterScore) {
				topScore = score;
				move = moves[i];
			}
		}
		
		return move;
	}

	return chooseMove(game, color, 2);
};













