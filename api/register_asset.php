<?php

include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$assetcode = trim($request->assetcode);
$assettype = trim($request->assettype);
$outlettype = trim($request->outlettype);
$manufacturer = trim($request->manufacturer);
$serialnumber = mysqli_real_escape_string($mysqli, trim($request->serialnumber));
$modelnumber = mysqli_real_escape_string($mysqli, trim($request->modelnumber));
$sentinel = trim($request->sentinel);
$healthcare = trim($request->healthcare);
$organisation = trim($request->organisation);
$building = trim($request->building);
$department = trim($request->department);
$floor = trim($request->floor);
$location = mysqli_real_escape_string($mysqli, trim($request->location));
$room = mysqli_real_escape_string($mysqli, trim($request->room));
$comment = mysqli_real_escape_string($mysqli, trim($request->comment));



$sqlmax = "SELECT MAX(assetid) As Max FROM assets";
$result = $mysqli->query($sqlmax);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$id = $row["Max"] + 1;
   }
} else {
  $id = 1;
}

$sqlassettype = "SELECT assettypeid, assettypename FROM assettypes WHERE assettypename = '$assettype'";
$result = $mysqli->query($sqlassettype);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$assettype = $row["assettypeid"];
$assettypename = $row["assettypename"];
   }
} else {
$assettype = 1;
}

$sqloutlettype = "SELECT outlettypeid, outlettypename FROM outlettypes WHERE outlettypename = '$outlettype'";
$result = $mysqli->query($sqloutlettype);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$outlettype = $row["outlettypeid"];
$outlettypename = $row["outlettypename"];
   }
} else {
$outlettype = 1;
}

$sqlmanufacturer = "SELECT manufacturerid FROM manufacturers WHERE manufacturername = '$manufacturer'";
$result = $mysqli->query($sqlmanufacturer);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$manufacturer = $row["manufacturerid"];
   }
} else {
$manufacturer = 1;
}

$sqlorganisation = "SELECT organisationid, organisationname FROM organisations WHERE organisationname = '$organisation'";
$result = $mysqli->query($sqlorganisation);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$organisation = $row["organisationid"];
$organisationname = $row["organisationname"];
   }
} else {
$organisation = 1;
}

$sqlbuilding = "SELECT buildingid, buildingname FROM buildings WHERE buildingname = '$building'";
$result = $mysqli->query($sqlbuilding);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$building = $row["buildingid"];
$buildingname = $row["buildingname"];
   }
} else {
$building = 1;
}

$sqldepartment = "SELECT departmentid, departmentname FROM departments WHERE departmentname = '$department'";
$result = $mysqli->query($sqldepartment);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$department = $row["departmentid"];
$departmentname = $row["departmentname"];
   }
} else {
$department = 1;
}

$sqlfloor = "SELECT floorid FROM floors WHERE floorname = '$floor'";
$result = $mysqli->query($sqlfloor);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$floor = $row["floorid"];
   }
} else {
$floor = 1;
}

if ($assetcode === "") {
$assetcode = $organisationname."-".$buildingname."-".$departmentname."-".$assettypename."-".$outlettypename."-".$location."-".$room;
}






$sqladdasset = "INSERT INTO assets(assetid, assetcode, assetoutlet, manufacturer, serialnumber, modelnumber, sentinel, healthcare, assetcomment) 
VALUES ('$id','$assetcode','$outlettype','$manufacturer','$serialnumber','$modelnumber','$sentinel','$healthcare','$comment')";

	if ($mysqli->query($sqladdasset) === TRUE) {
	}



$sqladdassetlocation = "INSERT INTO assetlocations(assetid, assetdepartment, assetfloor, assetlocationdetails, assetroomdetails)
VALUES ('$id','$department','$floor','$location','$room')";

	if ($mysqli->query($sqladdassetlocation) === TRUE) {

$authdata = [
'assetid' => $assetid
];
echo json_encode($authdata);
}

}
?>