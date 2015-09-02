<?php
/**
 * Created by PhpStorm.
 * User: chensq
 * Date: 2015/7/7
 * Time: 16:06
 */

$p=88;

function getuserid($n,$m=99)
{
    static $s=78;
$s++;

    $n=$n+2;
    echo "getuserid ".$n." ".$m ." ".$s."<br/>";
}


function add($a,$b)
{
    return $a+$b;
}
function mul($a,$b){
    return $a*$b;
}

function todo($a,$b,$f){
   echo $f($a,$b)."<br/>";
}
