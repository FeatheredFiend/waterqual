<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$name = trim($request->username);
$pwd = mysqli_real_escape_string($mysqli, trim($request->password));
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$role = mysqli_real_escape_string($mysqli, trim($request->role));
$jobtitle = mysqli_real_escape_string($mysqli, trim($request->jobtitle));
$organisation = mysqli_real_escape_string($mysqli, trim($request->organisation));

$sqlmax = "SELECT MAX(userid) As Max FROM users";
$result = $mysqli->query($sqlmax);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$id = $row["Max"] + 1;
   }
} else {
  $id = 1;
}

$sqlrole = "SELECT userroletypeid FROM userroletypes WHERE rolename = '$role'";
$result = $mysqli->query($sqlrole);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$role = $row["userroletypeid"];
   }
} else {
$role = 1;
}

$sqlorganisation = "SELECT organisationid FROM organisations WHERE organisationname = '$organisation'";
$result = $mysqli->query($sqlorganisation);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
$organisation = $row["organisationid"];
   }
} else {
$organisation = 1;
}


$sql = "INSERT INTO users(userid, username, password, email, role, jobtitle, organisation) 
VALUES ('$id','$name','$pwd','$email','$role','$jobtitle','$organisation')";


if ($mysqli->query($sql) === TRUE) {
$authdata = [

'username' => $name,
'pwd' => '',
'email' => $email,
'id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}

?>