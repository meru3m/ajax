<?php
header('Content-Type: application/json');

if(isset($_POST["whole"]) && !empty($_POST["whole"])) {
    $data = $_POST["whole"];
    $decodedData = json_decode($data, true); // Decode JSON as associative array

    if ($decodedData) {
        echo json_encode($decodedData);
    } else {
        echo json_encode("Error: Invalid data format");
    }
} else {
    echo json_encode("Error: Data not received");
}
