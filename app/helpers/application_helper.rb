module ApplicationHelper
  def game(chapter=nil)
    ret = <<-HTML
      <div id="sidePanel">
    		<button id="resetGame">Reset Game</button>
    		
    		<div class="newGame">
    		  <label>White:</label>
          <select id="white">
            <option value="human">Human</option>
            <option value="chapter1">Chapter 1</option>
            <option value="chapter2">Chapter 2</option>
          </select><br />

    		  <label>Black:</label>
          <select id="black">
            <option value="human">Human</option>
            <option value="chapter1">Chapter 1</option>
            <option value="chapter2" selected="true">Chapter 2</option>
          </select><br />
          <button id="newGame">New Game</button>
    		</div>
		
    		<div id="moveList"></div>
    	</div>
    	<div id="chess"></div>

      #{ javascript_include_tag "chess/ai1" }
      #{ javascript_include_tag "chess/ai2" }
		  <script type="text/javascript">
		    var game;
		    function newGame() {
		      $("#chess").html("");
		      var game = Chess.Game.create();
		      
		      var white = $("#white").val();
		      var black = $("#black").val();
		      if (white != "human") { Chess.AI.create('w', game, Chess.AI[white]); }
		      if (black != "human") { Chess.AI.create('b', game, Chess.AI[black]); }

        	game.onMove(function() {
        		$("#moveList").html(game.pgn({ newline_char: "<br />", max_width: 1 }));
        		if (game.game_over()) {
        		  if (game.in_checkmate()) {
        		    alert((game.turn() == "w" ? "Black" : "White") + " wins!")
        		  } else {
        		    alert("Draw")
        		  }
        		}
        	});

        	Chess.Board.create({
        		elt: "#chess",
        		game: game
        	});
        	game.reset();

          return game;
		    }
		    game = newGame();
		  
      	$("#resetGame").click(function() {
    		  game.reset();
      	});
      	
      	$("#newGame").click(function() {
      	  game = newGame();
      	});
      </script>
    HTML
    ret.html_safe
  end
end
