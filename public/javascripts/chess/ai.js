if (!window.Chess) { window.Chess = {}; }

Chess.AI = {
	create: function(color, game, implementation) {
		game.onMove(function() {
			if (game.turn() == color) {
				var move = implementation(game, color);
				game.move(move);
			}
		});
	}
};

