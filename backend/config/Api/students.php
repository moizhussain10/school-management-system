<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include("../db.php");

    // 1. Agar React data maang raha hai (GET)
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $select_query = "SELECT * FROM students";
        $execute_query = mysqli_query($connection, $select_query);

        $students = [];
        while ($row = mysqli_fetch_assoc($execute_query)) {
            $students[] = $row;
        }

        echo json_encode($students);
        exit();
    }

    // 2. Agar React naya data bhejh raha hai (POST)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // React ka data read kiya
        $data = json_decode(file_get_contents("php://input"), true);

        // Individual variables mein rakha
        $roll_number      = $data['roll_number'];
        $first_name       = $data['first_name'];
        $last_name        = $data['last_name'];
        $class_name       = $data['class_name'];
        $gender           = $data['gender'];
        $guardian_contact = $data['guardian_contact'];
        $email            = $data['email'];
        $status           = $data['status'];

        // Normal INSERT Query jo aap humesha likhte ho
       $insert_query = "INSERT INTO students (roll_number, first_name, last_name, class_name, gender, guardian_contact, email, status) VALUES ('$roll_number', '$first_name', '$last_name', '$class_name', '$gender', '$guardian_contact', '$email', '$status')";
        $execute_insert = mysqli_query($connection, $insert_query);

        if ($execute_insert) {
            echo json_encode(["message" => "Student Save Ho Gaya!"]);
        } else {
            echo json_encode(["message" => "Error Aaya Hai!"]);
        }
        exit();
    }
?>