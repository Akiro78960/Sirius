<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);

		}

		protected function executeAction() {
			$data = [];
			if(!empty($_POST["username"]) && !empty($_POST["pwd"])){
				$data["username"] = $_POST["username"];
				$data["pwd"] = $_POST["pwd"];
				$key = json_decode($this->callAPI("signin", $data));
				$_SESSION["key"]=$key;
				if(strlen($key) == 40){
					$_SESSION["username"]=$_POST["username"];
					setcookie("username", $_POST["username"], time() + 120);
				}
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
				header("location:monPerso.php");
			}
		}
	}
