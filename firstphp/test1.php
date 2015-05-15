<p>Á·Ï°php</p>

<?php
echo "test123";
echo "<br>";
header("content-Type: text/html; charset=gbk");
$age=array("peter"=>35,"ben"=>37,"joe"=>40);
$age["kate"]=34;
foreach ($age as $x=>$xvalue)
{
	echo "$x"." age is ".$xvalue;
	echo "<br>";
}

echo "this line is ".__LINE__;

foreach ($_SERVER as $s =>$svalue)
{
	echo $s."------".$svalue;
	echo "<br>";
}
?>