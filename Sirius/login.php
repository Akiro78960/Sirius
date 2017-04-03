<?php
	require_once("action/loginAction.php");

	$action = new IndexAction();
	$action->execute();
	require_once("partial/header.php")
?>
<main>
<div class="login-page">
		<div class="connectedas">
			<?php
			if(isset($_SESSION["key"])){
			if(isset($_SESSION["username"])) {
			 ?>
			<h3>Connected as : <?= $_SESSION["username"] ?></h3>
			<?= $_SESSION["key"] ?>
			<a href="logout.php">Logout</a>
			 <?php }else{
			  ?>
			  <h3>Not connected </h3>
			  <?php if(!isset($_SESSION["username"])){ ?>
				  Key: <?= $_SESSION["key"] ?>
			  <?php }}} ?>
		</div>
			<h1>Connexion</h1>
		    <div class="login-form">
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
		</div>
	</main>
    </body>
</html>
