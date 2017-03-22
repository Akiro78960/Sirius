<?php
	require_once("action/CommonAction.php");

	class LogoutAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);

		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];
			$_SESSION["key"] = json_decode($this->callAPI("signout", $data));
            $_SESSION["key"]=null;
            $_SESSION["username"]=null;
			$_SESSION["jsonPerso"]=null;
			session_destroy();
            header("location:login.php");
		}
	}
