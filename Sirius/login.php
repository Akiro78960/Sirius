<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$action->execute();
?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>Sha1</title>
        <link href="css/global.css" rel="stylesheet" />
        <meta charset="utf-8"/>
		<title>Login</title>
    </head>
    <body>
		<h1>Connexion</h1>

	    <div class="login-form-frame">
	        <form action="login.php" method="post">
	            <div class="form-label">
	                <label for="username">Nom d'usager : </label>
	            </div>
	            <div class="form-input">
	                <input type="text" name="username" id="username" />
	            </div>
	            <div class="form-separator"></div>

	            <div class="form-label">
	                <label for="password">Mot de passe : </label>
	            </div>
	            <div class="form-input">
	                <input type="password" name="pwd" id="password" />
	            </div>
	            <div class="form-separator"></div>

	            <div class="form-label">
	                &nbsp;
	            </div>
	            <div class="form-input">
	                <button type="submit">Connexion</button>
	            </div>
	            <div class="form-separator"></div>
	        </form>
	    </div>
    </body>
</html>
