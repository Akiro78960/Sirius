<?php
	require_once("action/CommonAction.php");

	class AjaxSkillsAction extends CommonAction{
		public $result = "result";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
            if(isset($_SESSION["username"])){
                $data = [];
                $data["key"] = $_SESSION["key"];
                $data["skill-name"] = $_POST["value"];
                echo $data["skill-name"];
                $this->result = $this->callAPI("action", $data);
            }

		}
	}
