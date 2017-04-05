<?php
	require_once("action/AjaxSkillsAction.php");

	$action = new AjaxSkillsAction();
	$action->execute();

	echo $action->result;
