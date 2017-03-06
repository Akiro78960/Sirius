<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$action->execute();
	require_once("partial/header.php")
?>

		<div class="sectionKey"></div>
		<div class="sectionAuthentification">
			<h1>
				Sirius
			</h1>

			Menu Principal
			<div class="formSeparator"></div>

			<div id="result">
			</div>
		</div>
    </body>
</html>
