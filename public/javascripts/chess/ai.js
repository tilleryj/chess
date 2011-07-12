if (!window.Chess) { window.Chess = {}; }

Chess.AI = {
	create: function(color, game) {

		game.onMove(function() {
			if (game.turn() == color) {
				var moves = game.moves();
				var move = moves[Math.floor(Math.random() * moves.length)];
				game.move(move);
			}
		});
		
	}
};

