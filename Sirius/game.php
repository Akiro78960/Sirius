<?php
	require_once("action/gameAction.php");

	$action = new GameAction();
	$action->execute();
	require_once("partial/header.php")
?>
    <script src="JS/jquery.min.js"></script>
    <script src="JS/gameClasses.js"></script>
    <script src="JS/sprite.js"></script>
    <script src="JS/game.js"></script>
		<div class="Game">
			<!-- pour loading screen -->
			<div id="LoadingDiv">
			</div>
            <div id="canevas-holder">
				<canvas id="canvas" width="800" height="600"><canvas>
            </div>
			<div id="buttons-holder">
				<div id="button1" style="background-image: url(images/WoodSignAlpha.png);width:200px;height:84px;" onclick="clickButton1()"></div>
				<div id="button2" style="background-image: url(images/WoodSignAlpha.png);width:200px;height:84px;" onclick="clickButton2()"></div>
				<div id="button3" style="background-image: url(images/WoodSignAlpha.png);width:200px;height:84px;" onclick="clickButton3()"></div>
			</div>

		</div>
    </body>
</html>
