<?php
header("content-Type: text/html; charset=gbk");
function  convertSpace($string)
{
	return str_replace("_", "+", $string);
}

$str="��_����_�滻_��_�Ӻ�+";

$str1=filter_var($str,
		FILTER_CALLBACK,
		array("options"=>"convertSpace"));

echo $str1;


class person{
	public $name="";
public	$age=0;

}
$p=new person();
$p ->name="meinv";
$p->age=100;

$jp=json_encode($p);
echo $jp;
?>