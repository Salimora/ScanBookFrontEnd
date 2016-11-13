<?php
$conn = mysql_connect('127.0.0.1:3306','root','123', 'scanbook') or die('error');
$q = intval($_GET['q']);
$sql = "SELECT * FROM scanbook.scanbook_front_book WHERE ISBN =" .$q;
//search book from table
$result = mysql_query($sql);

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