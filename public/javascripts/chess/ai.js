if (!window.Chess) { window.Chess = {}; }

Chess.AI = {
	create: function(color, game, implementation) {
		game.onMove(function() {
			if (game.turn() == color) {
				implementation(game, color);
			}
		});
	}
};

