<?php
header("content-Type: text/html; charset=gbk");
$server="127.0.0.1";
$user="root";
$pwd="root";
$dsn="mysql:host=".$server.";port=3306;dbname=test";
$conn=new PDO($dsn, $user, $pwd, $options);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$conn->query("SET names 'gbk'");

echo  "数据库连接成功";

$creattable="create table teacher(id int(8),name varchar(50))";
$conn->query($creattable);
echo "表创建完成";

//插入数据
$insertdata="insert into teacher (id,name) values (1,'仓老师')";
$conn->query($insertdata);

echo "插入数据1完成";

$insertprepare="insert into teacher (id,name) values (:id,:name)";
$statement=$conn->prepare($insertprepare);
$iid=2;
$iname="小泽老师";
$statement->bindParam(":id", $iid);
$statement->bindParam(":name", $iname);


$statement->execute();
echo "插入数据2完成";



$conn=null;//关闭连接
?>