<?php
// Database credentials
$servername = 'localhost';
$username = 'root';
$password = ''; // Enter your password here if you have one
$database = 'trek';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Unable to connect to database: " . mysqli_connect_error());
}

// SQL to create table
$sql = "CREATE TABLE IF NOT EXISTS enquiry (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(30) NOT NULL,
    sname VARCHAR(30) NOT NULL,
    entity VARCHAR(50) NULL,
    num VARCHAR(15) NOT NULL,  
    email VARCHAR(50) NULL
)";

// Create table
if (mysqli_query($conn, $sql)) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . mysqli_error($conn); // Improved error message
}

// Prepare user input data to insert into the database
$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$sname = mysqli_real_escape_string($conn, $_POST['sname']);
$entity = mysqli_real_escape_string($conn, $_POST['entity']);
$num = mysqli_real_escape_string($conn, $_POST['number']); 
$email = mysqli_real_escape_string($conn, $_POST['email']);

// Insert data into the database
$sql1 = "INSERT INTO enquiry (fname, sname,entity, num, email) VALUES ('$fname', '$sname', '$entity', '$num', '$email')";

// Check if insertion is successful
if (mysqli_query($conn, $sql1)) {
    // Redirect upon successful form submission
    header("Location: contact.html");
    exit();
} else {
    echo "Error: " . $sql1 . "<br>" . mysqli_error($conn);
}

// Close the connection
mysqli_close($conn);
?>
