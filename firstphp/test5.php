<?php
header("content-Type: text/html; charset=gbk");
$server="127.0.0.1";
$user="root";
$pwd="root";
$dsn="mysql:host=".$server.";port=3306;dbname=test";
$conn=new PDO($dsn, $user, $pwd, $options);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$conn->query("SET names 'gbk'");

echo  "���ݿ����ӳɹ�";

$creattable="create table teacher(id int(8),name varchar(50))";
$conn->query($creattable);
echo "�������";

//��������
$insertdata="insert into teacher (id,name) values (1,'����ʦ')";
$conn->query($insertdata);

echo "��������1���";

$insertprepare="insert into teacher (id,name) values (:id,:name)";
$statement=$conn->prepare($insertprepare);
$iid=2;
$iname="С����ʦ";
$statement->bindParam(":id", $iid);
$statement->bindParam(":name", $iname);


$statement->execute();
echo "��������2���";



$conn=null;//�ر�����
?>