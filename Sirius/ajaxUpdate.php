<?php
	require_once("action/ajaxUpdateAction.php");

	$action = new AjaxUpdateAction();
	$action->execute();

	echo $action->result;
