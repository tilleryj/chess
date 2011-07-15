Chess.AI["chapter1"] = function(game, color) {
	var moves = game.moves();
	var move = moves[Math.floor(Math.random() * moves.length)];
	game.move(move);
};
