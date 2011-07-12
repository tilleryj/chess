if (!window.Chess) { window.Chess = {}; }

Chess.Board = {
	
	pieceSymbols: {
		K: "\u2654",
		Q: "\u2655",
		R: "\u2656",
		B: "\u2657",
		N: "\u2658",
		P: "\u2659",
		k: "\u265A",
		q: "\u265B",
		r: "\u265C",
		b: "\u265D",
		n: "\u265E",
		p: "\u265F"
	},
	
	create: function(options) {
		
		var wrapper = options.elt,
			game = options.game,
			board;

		function createBoard() {
			board = $("<table class='board'></table>");
			board.appendTo(wrapper);

			for (var row=0; row<8; row++) {
				$("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(board);
			}
		}
		
		function squareFromCell(td) {
			td = $(td);
			var column = "abcdefgh"[td.index()];
			var row = "87654321"[td.closest("tr").index()];
			return column + row;
		}

		function draw() {
			var fen = game.fen();
			$("td", board).text("");
			// Columns, h-a
			for (var column=0; column<=7; column++) {
				// Rows, 1-8
				for (var row=0; row<=7; row++) {
					var square = "abcdefgh"[column] + "87654321"[row];
					var piece = game.get(square);
					if (piece) {
						var symbol = Chess.Board.pieceSymbols[piece.type[piece.color == 'w' ? 'toUpperCase' : 'toLowerCase']()];
						$($("td", board)[row * 8 + column]).html("<span data-square='" + square + "'>" + symbol + "</span>");
					}
				}
			}
			
			$("td span", board).draggable({ revert: true, revertDuration: 200 });
			$("td").droppable({
				hoverClass: "pieceHover",
				drop: function(event, ui) {
					game.move({
						from: ui.draggable.data("square"),
						to: squareFromCell($(this)[0])
					});
					draw();
				}
			});
		}

		createBoard();
		draw();
	}
};







