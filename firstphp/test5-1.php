<?php
header("content-Type: text/html; charset=gbk");
$server="127.0.0.1";
$user="root";
$pwd="root";
$dsn="mysql:host=".$server.";port=3306;dbname=test";
$conn=new PDO($dsn, $user, $pwd, $options);
$conn->query("SET names 'gbk'");

$selectsql="select * from teacher where id=2";
$sqlvar=$conn->query($selectsql);

foreach ($sqlvar as $row)
{
	echo "<br>".$row["id"]." ".$row["name"];

}

$conn=null;
?>