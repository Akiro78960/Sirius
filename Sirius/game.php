<?php
	require_once("action/gameAction.php");

	$action = new GameAction();
	$action->execute();
	require_once("partial/header.php")
?>
    <script src="JS/jquery.min.js"></script>
    <script src="JS/game.js"></script>
		<div class="Game">
			<h1>
				Game
			</h1>
            <div id="canevas-holder">
				<canvas id="canvas" width="800" height="600"><canvas>
            </div>
		</div>
    </body>
</html>
