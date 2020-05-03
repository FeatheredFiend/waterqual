<?php
require 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$assettype = mysqli_real_escape_string($mysqli, trim($request->assettype));
}


$sqlassettype = "SELECT assettypeid, assettypename FROM assettypes WHERE assettypename = '$assettype'";
$result = $mysqli->query($sqlassettype);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$assettypeid = $row["assettypeid"];
   }
} else {
$assettype = 1;
}


$sql = "SELECT `outlettypeid`, `outlettypename` FROM `outlettypes` WHERE assetoutlettypeid = '$assettypeid' ORDER BY outlettypename COLLATE utf8_general_ci";
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