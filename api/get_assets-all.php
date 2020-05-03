<?php
require 'database.php';


$sql = "SELECT assets.assetid, assets.assetcode, assettypes.assettypename, outlettypes.outlettypename, manufacturers.manufacturername, assets.serialnumber, assets.modelnumber, assets.assetcomment, (IF(assets.sentinel = 1,'True','False')) AS sentinel, (IF(assets.healthcare = 1,'True','False')) AS healthcare, organisations.organisationname, buildings.buildingname, departments.departmentname, floors.floorname, assetlocations.assetlocationdetails, assetlocations.assetroomdetails
FROM organisations INNER JOIN ((assettypes INNER JOIN outlettypes ON assettypes.assettypeid = outlettypes.assetoutlettypeid) INNER JOIN (manufacturers INNER JOIN ((buildings INNER JOIN departments ON buildings.buildingid = departments.departmentbuilding) INNER JOIN (floors INNER JOIN (assetlocations INNER JOIN assets ON assetlocations.assetid = assets.assetid) ON floors.floorid = assetlocations.assetfloor) ON departments.departmentid = assetlocations.assetdepartment) ON manufacturers.manufacturerid = assets.manufacturer) ON outlettypes.outlettypeid = assets.assetoutlet) ON organisations.organisationid = departments.departmentorganisation
ORDER BY assetid";
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

