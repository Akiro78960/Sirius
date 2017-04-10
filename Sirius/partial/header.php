<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>Sirius</title>
        <link href="css/style.css" rel="stylesheet" />
        <meta charset="utf-8"/>
		<title>Login</title>
        <script src="JS/jquery.min.js"></script>
        <script src="JS/header.js"></script>
    </head>
    <body>
        <div class="menu">
            <div class = "menu-item" id="item1"><a href="index.php">Acceuil</a></div>
            <div class = "menu-item" id="item2">
                <?php
                if(isset($_SESSION["key"]) && isset($_SESSION["username"])) {
                 ?>
                    <a href="logout.php">Logout</a>
                <?php }else{?>
                    <a href="login.php">Se Connecter</a>
                    <?php }?>
                    </div>

            <div class = "menu-item" id="item3"><a href="monPerso.php">
                <?php if(isset($_COOKIE["username"])){
                    echo $_COOKIE["username"];
                }else{echo "Mon Personnage";}?></a></div>
            <div class = "menu-item" id="item4"><a href="parties.php">Parties en cours</a></div>
        </div>
