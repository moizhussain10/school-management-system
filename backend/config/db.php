<?php
$connection = mysqli_connect("localhost", "root", "", "school_db");

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>