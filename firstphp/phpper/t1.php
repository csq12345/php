<html>

<body>


<form action="t1.php">
    <input name="username" type="text"/>
    <input type="submit" value="submitdata"/>
</form>

<?php
/**
 * Created by PhpStorm.
 * User: chensq
 * Date: 2015/7/3
 * Time: 10:36
 */
require "t2.php";

echo $_GET["username"];
$number="g";

echo intval($number,16);
$a=3;
 getuserid($a);
getuserid($a);
echo $a;
echo $GLOBALS["p"];
echo($a."<br/>");
todo(2,4,"mul");
?>
<a href="<?php echo ($username) ?>">连接</a>

<?php
$arr=array(1=>3,2,0,9,4,6);
echo "key ".key($arr)."<br/>";
for(reset($arr);$k=key($arr);next($arr))
{
$val=current($arr);
    echo "element ".$k."equals ".$val."<br/>";
}

echo $arr;
?>

</body>
</html>