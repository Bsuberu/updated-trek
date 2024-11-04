<?php
$server = "localhost";
$user = "root";
$password = "";
$database = "trek";

// Database connection
$connect = mysqli_connect($server, $user, $password, $database);

if (!$connect) {
    die("Unable to connect to database: " . mysqli_connect_error());
}

// Create table
$sq = "CREATE TABLE IF NOT EXISTS homedata (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL)";

if (mysqli_query($connect, $sq)) {
    echo "Table created successfully.";
} else {
    die("Unable to create table: " . mysqli_error($connect));
}

// Check if form data is set
if (isset($_REQUEST['name']) && isset($_REQUEST['email'])) {
    $name = mysqli_real_escape_string($connect, $_REQUEST['name']);
    $email = mysqli_real_escape_string($connect, $_REQUEST['email']);

    // Insert form data into database
    $sq2 = "INSERT INTO homedata (name, email) VALUES ('$name', '$email')";
    
    if (mysqli_query($connect, $sq2)) {
        header("Location: index.html");
        exit();
    } else {
        echo "Error inserting data: " . mysqli_error($connect);
    }
} 

// Close the connection
mysqli_close($connect);
?>
?>
