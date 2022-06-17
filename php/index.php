<?php
include_once("Flights.class.php");
    set_time_limit(0);

	$from = "";
	if (isset($_GET['from']))
	{
		$from = $_GET['from'];
	}
	
	$to = "";
	if (isset($_GET['to']))
	{
		$to = $_GET['to'];
	}
	
	if (empty($from) || empty($to))
	{
		echo "�����ʽ: GET http://host?from=TPE&to=SFO <br/>";
		exit();
	}
	
	// ���ת������
	$deepth = 5;
	if (isset($_GET['deepth']))
	{
		$deepth = $_GET['deepth'];
	}
	
	
	$flights = new Flights();
	
	// ֱ��
	//$arr = $flights->flights_search('YZR','LBX');
	
	// ��һ��·��
	//$arr = $flights->flights_search('YZR','CTN');
	
	// ������·��
	//$arr = $flights->flights_search('YZR','YSO');
	$arr = $flights->flights_search($from, $to, $deepth);
	
	$ret_arr = array();
	foreach ($arr as $key=>$item)
	{
    	$ret_arr[]=array_values($item);
	}
	echo json_encode($ret_arr);
?>