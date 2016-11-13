<?php 
$conn = mysql_connect('127.0.0.1:3306','root','123', 'scanbook') or die('error');
$q = intval($_GET['q']);
$readingStatus = intval($_GET['readingStatus']);
$note = $_GET['note'];
//update book info to table
$sql = "UPDATE scanbook.scanbook_front_book SET readOrNot ='" .$readingStatus. "',note='" .$note."' WHERE ISBN =".$q;
mysql_query($sql);

//get update info from table
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