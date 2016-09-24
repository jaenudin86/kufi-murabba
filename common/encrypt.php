<?php

require_once('encryptor.php');

if (isset($_POST)) {
	$string  = $_POST['json'];
	$encrypt = new Encryptor();
	$encrypt->encrypt($string);
}