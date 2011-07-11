if (!window.Chess) { window.Chess = {}; }

Chess.Board = {
	
	pieceSymbols: {
		black: {
			king:   "\u2654",
			queen:  "\u2655",
			rook:   "\u2656",
			bishop: "\u2657",
			knight: "\u2658",
			pawn:   "\u2659"
		},

		white: {
			king:   "\u265A",
			queen:  "\u265B",
			rook:   "\u265C",
			bishop: "\u265D",
			knight: "\u265E",
			pawn:   "\u265F"
		}
	},
	
	create: function(wrapper) {

		function createCanvas() {
			var canvas = $('<canvas width="800" height="800" />');
			canvas.appendTo(wrapper);
			return canvas[0];
		}
		
		function draw(processing) {
			var GRID_SIZE = 100;			
			
			function drawPiece(symbol, x, y) {
				var pieceLeft = x - 28;
				var pieceTop = y + 15;

				processing.createFont("Arial", 60);

				processing.fill(0,0,0);
				processing.text(symbol, pieceLeft - 1, pieceTop - 1);
				processing.text(symbol, pieceLeft, pieceTop - 1);
				processing.text(symbol, pieceLeft + 1, pieceTop - 1);
				processing.text(symbol, pieceLeft + 1, pieceTop);
				processing.text(symbol, pieceLeft + 1, pieceTop + 1);
				processing.text(symbol, pieceLeft, pieceTop + 1);
				processing.text(symbol, pieceLeft - 1, pieceTop + 1);
				processing.text(symbol, pieceLeft - 1, pieceTop);

				processing.fill(255,255,255);
				processing.text(symbol, pieceLeft, pieceTop);
			}
			
			
			processing.draw = function() {
				
				processing.size(800, 800);
				processing.background(50);
				
				// Columns, A-H
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
						
						var symbol = Chess.Board.pieceSymbols.white.bishop;

						drawPiece(symbol, left + 50, top + 50);
					}
				}
			};
		}
		
		processing = new Processing(createCanvas(), draw);
	}
};







