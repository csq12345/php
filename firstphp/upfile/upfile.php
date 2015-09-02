<?php
/**
 * Created by PhpStorm.
 * User: chensq
 * Date: 2015/6/23
 * Time: 16:12
 */
echo "上传的文件";
$fn=basename($_FILES["file1"]["name"]);
$username=$_POST["uname"];
echo $fn." ".$username;
$sfn="e:/temp/".$fn;
echo "保存至".$sfn;
$mb=move_uploaded_file($_FILES["file1"]["tmp_name"],$sfn);
if($mb)
{
    echo "上传成功";
}
else {
    echo "失败";
}
?>