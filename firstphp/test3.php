<?php
header("content-Type: text/html; charset=gbk");
function customError($errno,$errstr)
{
	echo "����:".$errstr;
}

//set_error_handler("customError");
try 
{
	$file=fopen("d:/dddd.txt","r");// or exit("Unable to open file!");
}
catch (Exception $ex)
{
	echo "��׽exception";
}
?>

<?php 
class customexception extends Exception
{
public  function errormessage()
{
	echo "�����Զ����쳣";
}
}
?>