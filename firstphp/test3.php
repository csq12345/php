<?php
header("content-Type: text/html; charset=gbk");
function customError($errno,$errstr)
{
	echo "错误:".$errstr;
}

//set_error_handler("customError");
try 
{
	$file=fopen("d:/dddd.txt","r");// or exit("Unable to open file!");
}
catch (Exception $ex)
{
	echo "捕捉exception";
}
?>

<?php 
class customexception extends Exception
{
public  function errormessage()
{
	echo "调用自定义异常";
}
}
?>