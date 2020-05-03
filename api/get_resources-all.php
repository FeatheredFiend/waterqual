<?php
require 'database.php';

$sql = "SELECT `resourceid`, `resourcename` FROM `resources` ORDER BY resourcename COLLATE utf8_general_ci";
$result = mysqli_query($mysqli,$sql); 
$array = array();
if ($result->num_rows > 0) {
// output data of each row
    while($row = $result->fetch_assoc()) {
        $array[] = $row;
    }
	print json_encode($array);
} 
else 
{
    echo "0 results";
}
?>