<?php
header("Content-type: text/html; charset=utf-8"); 
$conn = mysql_connect('127.0.0.1:3306','root','123', 'scanbook') or die('error');
$q = intval($_GET['q']);
$title = $_GET['title'];
$author = $_GET['author'];
$pageCount = intval($_GET['pageCount']);
$readOrNot = intval($_GET['readOrNot']);
$note = $_GET['note'];
//insert book to table
$sql = "INSERT INTO scanbook.scanbook_front_book(ISBN, title, author, pageCount, readOrNot, note) VALUES (".$q.",'".$title."','".$author."',".$pageCount.",".$readOrNot.",'".$note."');";
mysql_query($sql);

//get insert result
$sql2 = "SELECT * FROM scanbook.scanbook_front_book WHERE ISBN =" .$q;
$result = mysql_query($sql2);

if (mysql_num_rows($result) > 0) {
    
    $bookInfo = array();
    while($row = mysql_fetch_assoc($result)) {
        $bookInfo['exist'] = "true";
        $bookInfo['ISBN'] = $row['ISBN'];
        $bookInfo['title'] = $row['title'];
        $bookInfo['author'] = $row['author'];
        $bookInfo['pageCount'] = $row['pageCount'];
        $bookInfo['readOrNot'] = $row['readOrNot'];
        $bookInfo['note'] = $row['note']; 

        echo json_encode($bookInfo);
       
    }
}


?>