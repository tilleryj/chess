Chess.AI["chapter1"] = function(game, color) {
	var moves = game.moves();
	return moves[Math.floor(Math.random() * moves.length)];
};
