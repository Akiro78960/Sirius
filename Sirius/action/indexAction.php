<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);

		}

		protected function executeAction() {
			$data = [];
			$data["username"] = $_POST["username"];
			$data["pwd"] = $_POST["pwd"];
			$key = json_decode($this->callAPI("signin", $data));
			echo $key;
		}
	}
