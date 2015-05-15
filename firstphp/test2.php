<?php
 namespace  name1{
	class c1{
		function  getx()
		{echo "name1>getx:". __NAMESPACE__;
			return 20;
		}
		
	}
 }
namespace  name2{
use name1 as n1;
	class c1{
	 	function  getx()
		{
			$n1=new n1\c1();
			echo "name2>getx:". __NAMESPACE__;
			return $n1->getx();
		}
	}
}
?>