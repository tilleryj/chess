if (!window.Chess) { window.Chess = {}; }

Chess.Board = {
	
	pieceSymbols: {
		k: "\u265A",
		q: "\u265B",
		r: "\u265C",
		b: "\u265D",
		n: "\u265E",
		p: "\u265F"
	},
	
	create: function(options) {
		
		var wrapper = options.elt;
		var game = options.game;

		function createCanvas() {
			var canvas = $('<canvas width="800" height="800" />');
			canvas.appendTo(wrapper);
			return canvas[0];
		}
		
		function draw(processing) {
			var GRID_SIZE = 100;			
			
			function drawPiece(symbol, color, x, y) {
				var pieceLeft = x - 28	;
				var pieceTop = y + 15;

				processing.createFont("Arial", 60);

				if (color == "w") {
					processing.fill(0,0,0);
				} else {
					processing.fill(255,255,255);
				}
				processing.text(symbol, pieceLeft - 1, pieceTop - 1);
				processing.text(symbol, pieceLeft, pieceTop - 1);
				processing.text(symbol, pieceLeft + 1, pieceTop - 1);
				processing.text(symbol, pieceLeft + 1, pieceTop);
				processing.text(symbol, pieceLeft + 1, pieceTop + 1);
				processing.text(symbol, pieceLeft, pieceTop + 1);
				processing.text(symbol, pieceLeft - 1, pieceTop + 1);
				processing.text(symbol, pieceLeft - 1, pieceTop);

				if (color == "b") {
					processing.fill(0,0,0);
				} else {
					processing.fill(255,255,255);
				}
				processing.text(symbol, pieceLeft, pieceTop);
			}
			
			
			processing.draw = function() {
				
				processing.size(800, 800);
				processing.background(50);
				
				var fen = game.fen();
				
				// Columns, h-a
				for (var column=0; column<=7; column++) {
					// Rows, 1-8
					for (var row=0; row<=7; row++) {
						if ((row + column) % 2 == 0) {
							processing.fill(255,255,255);
						} else {
							processing.fill(0,0,0);
						}
						var top = row * GRID_SIZE;
						var left = column * GRID_SIZE;
						processing.rect(left, top, GRID_SIZE, GRID_SIZE);
						
						var square = "hgfedcba"[column] + "87654321"[row];
						var piece = game.get(square);
						if (piece) {
							window.p = piece
							var symbol = Chess.Board.pieceSymbols[piece.type];

							drawPiece(symbol, piece.color, left + 50, top + 50);
						}
					}
				}
			};
		}
		
		processing = new Processing(createCanvas(), draw);
	}
};







