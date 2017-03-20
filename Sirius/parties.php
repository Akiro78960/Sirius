<?php
	require_once("action/partiesAction.php");

	$action = new partiesAction();
	$action->execute();
	require_once("partial/header.php")
?>
    <script src="JS/jquery.min.js"></script>
    <script src="JS/parties.js"></script>
		<div class="parties">
			<h1>
				Parties en cours :
			</h1>
            <div id="parties-details">
            </div>
			<div style="clear:both"></div>
		</div>
    </body>
</html>
