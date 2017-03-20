<?php
	require_once("action/ajaxPartiesAction.php");

	$action = new AjaxPartiesAction();
	$action->execute();

	echo $action->result;
