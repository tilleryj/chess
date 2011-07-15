module ApplicationHelper
  def game(chapter=nil)
    ret = <<-HTML
      <div id="sidePanel">
    		<button id="resetGame">Reset Game</button>
		
    		<div id="moveList"></div>
    	</div>
    	<div id="chess"></div>

      #{ javascript_include_tag "chess/ai#{chapter}" }
		  <script type="text/javascript">
      	var game = Chess.Game.create();
      	var ai = Chess.AI.create('b', game, Chess.AI.chapter#{chapter});

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

      	$("#resetGame").click(function() {
      		game.reset();
      	});
      </script>
    HTML
    ret.html_safe
  end
end
