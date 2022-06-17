<?php
class Flights
{
	// keep	search result
	private	$flights_result;
	function __construct()
	{
	}
	
	function __destruct()
	{
	}
	
	function flights_search($from, $to, $max_deepth = 7)
	{
		$this->flights_result =	array();
		
		$this->flights_result['from'] =	$from;
		$this->flights_result['to']	= $to;
		$this->flights_result['deepth']	= 0;
		$this->flights_result['flights'] = array();
		
		//$airports = file_get_contents('airports.json');
		$flights = file_get_contents('flights.json');
		$arr_flights =	json_decode($flights, true);
		
		$flights_to	= $this->get_flights_by_from($arr_flights, $from);
		if (count($flights_to) <= 0)
		{
			return array();
		}
		
		$flights_check = $this->check_flights_by_to($flights_to, $to);
		if (count($flights_check) >	0)
		{
			// single direct flight
			return $flights_check;
		}
		
		$deepth	= 0;
		$this->flights_result['flights'][$deepth] =	$flights_to;
		while(true)
		{
			if ($deepth	>= $max_deepth)
			{
				$this->flights_result['deepth']	= 0;
				$this->flights_result['flights'] = array();
				break;
			}
			$flights_check = $this->get_flights_by_array($arr_flights, $flights_to);
			$flights_to	= $flights_check;
			
			$deepth	= $deepth +	1;
			$this->flights_result['flights'][$deepth] =	$flights_check;
			$flights_check = $this->check_flights_by_to($flights_check,	$to);
			if (count($flights_check) >	0)
			{
				$this->flights_result['deepth']	= $deepth;
				$this->flights_result['flights'][$deepth] =	$flights_check;
				break;
			}
		}
		return $this->get_flights();
	}
	
	function get_flights()
	{
		$fligths = array();
		$to	= $this->flights_result['to'];
		$deepth	= $this->flights_result['deepth'];
		
		if ($deepth <= 0)
		{
			return	$fligths;
		}
		
		$index = 0;
		$last =	$this->flights_result['flights'][$this->flights_result['deepth']];
		
		// 最后一步，有可能出现多条记录, 即多种转机方案
		foreach($last as $f)
		{
			$fligths[$index][$deepth] =	$f;
			$from =	$f['from'];
			for($i=$deepth-1; $i >=	0; $i --)
			{
				foreach($this->flights_result['flights'][$i] as	$v)
				{
					if ($v['to'] ==	$from)
					{
						$fligths[$index][$i] = $v;
						$from =	$v['from'];
					}
				}
			}
			$fligths[$index] = array_reverse($fligths[$index]);
			$index ++;
		}
		
		return	$fligths;
	}
	
	function get_flights_by_array($flights,	$flights_to)
	{
		$to	= array();
		foreach($flights_to	as $fv)
		{
			foreach($flights as	$v)
			{
				if ($v['from'] == $fv['to'])
				{
					$to[] =	$v;
				}
			}
		}
		
		return $to;
	}
	
	function get_flights_by_from($flights, $from)
	{
		$to	= array();
		foreach($flights as	$v)
		{
			if ($v['from'] == $from)
			{
				$to[] =	$v;
			} 
		}
		
		return $to;
	}
	
	function check_flights_by_to($flights, $to)
	{
		$check = array();
		foreach($flights as	$v)
		{
			if ($v['to'] ==	$to)
			{
				$check[] = $v;
			} 
		}
		return $check;
	}
}

?>