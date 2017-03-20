<?php
	require_once("action/ajaxJoinGameAction.php");

	$action = new AjaxJoinGameAction();
	$action->execute();

	echo $action->result;
