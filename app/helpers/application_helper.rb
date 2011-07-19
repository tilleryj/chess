module ApplicationHelper
  def game(chapter=nil)
    chapter_options = chapters.map{|c| ["Chapter #{c}", "chapter#{c}"]}
    ret = <<-HTML
      <div id="sidePanel">
    		<div class="newGame">
    		  <label>White:</label>
          <select id="white">
            <option value="human">Human</option>
            #{options_for_select chapter_options }
          </select><br />

    		  <label>Black:</label>
          <select id="black">
            <option value="human">Human</option>
            #{options_for_select chapter_options, "chapter#{chapter}" }
          </select><br />
          <button id="newGame">New Game</button>
    		</div>
		
    		<div id="moveList"></div>
    	</div>
    	<div id="chess"></div>

		  <script type="text/javascript">
		    $(function() {
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
          		    alert((game.turn() == "w" ? "Black" : "White") + " wins!");
          		  } else {
          		    alert("Draw");
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
		    
  		    newGame();
      	
        	$("#newGame").click(function() {
        	  newGame();
        	});
		    });
      </script>
    HTML
    ret.html_safe
  end
  
  def chapters
    (1..3).to_a
  end
end






