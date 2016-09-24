<?php

/*
 * Author : Muhibbudin Suretno
 * Date : 24/9/2016
 */
class Encryptor
{
	private $tempDir  = '../temporary/';
	private $tempDirObject = '';
	private $tempName = '';
	private $tempFile = '';
	private $data     = '';

	public function __construct() 
	{
		$this->tempDirObject = $_SERVER['SERVER_NAME'].DIRECTORY_SEPARATOR.'temporary'.DIRECTORY_SEPARATOR;
	}

	public function encrypt($json)
	{
		if (!empty($json)) {
			$this->data = $json;
			$this->fileName = date('dmY').uniqid().'.json';
			$this->tempFile = $this->tempDir.$this->fileName;
			touch($this->tempFile);
			$file = fopen($this->tempFile, "w");
			fwrite($file, $this->data);
			fclose($file);

			$response = array(
					'respone' => 200,
					'message' => 'File generate sucessfull',
					'file' => $this->fileName,
					'directory' => $this->tempDirObject,
					'date' => date('d-m-Y')
				);
			print_r(json_encode($response));
		} else {
			$response = array(
					'respone' => 401,
					'message' => 'Unable to generate file',
					'date' => date('d-m-Y')
				);
			print_r(json_encode($response));
		}
	}

	public function decrypt($fileName)
	{
		if (file_exists($this->tempDir.$fileName)) {
			$file = fopen($this->tempDir.$fileName, "r");
			$string = fread($file,filesize($this->tempDir.$fileName));
			fclose($file);

			$response = array(
					'respone' => 200,
					'message' => $string,
					'file' => $fileName,
					'directory' => $this->tempDirObject,
					'date' => date('d-m-Y')
				);
			print_r(json_encode($response));
		} else {
			$response = array(
					'respone' => 401,
					'message' => 'Unable to open file',
					'date' => date('d-m-Y')
				);
			print_r(json_encode($response));
		}
	}


}