<?php
	require_once("action/CommonAction.php");

	class AjaxPartiesAction extends CommonAction{
		public $result = "result";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
            if(isset($_SESSION["username"])){
                $data = [];
                $data["key"] = $_SESSION["key"];
                $this->result = $this->callAPI("list", $data);

            }
		}
	}
