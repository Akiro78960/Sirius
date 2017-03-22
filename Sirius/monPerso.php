<?php
	require_once("action/monPersoAction.php");

	$action = new MonPersoAction();
	$action->execute();
	require_once("partial/header.php")
?>
        <script src="JS/jquery.min.js"></script>
        <script src="JS/monPerso.js"></script>
		<main>
			<div class="Personnage">
				<h1>
					Mon Personnage
				</h1>
	            <div id="personnage-details">
	            </div>
			</div>
		</main>
    </body>
</html>
