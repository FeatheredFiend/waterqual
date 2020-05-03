<?php
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$building = mysqli_real_escape_string($mysqli, trim($request->building));
}


$sqlbuilding = "SELECT buildingid, buildingname FROM buildings WHERE buildingname = '$building'";
$result = $mysqli->query($sqlbuilding);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$buildingid = $row["buildingid"];
   }
} else {
$building = 1;
}


$sql = "SELECT `departmentid`, `departmentname` FROM `departments` WHERE departmentbuilding = '$buildingid' ORDER BY departmentname COLLATE utf8_general_ci";
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