<?php
	require_once("action/AjaxPersoAction.php");

	$action = new AjaxPersoAction();
	$action->execute();

	echo $action->result;
