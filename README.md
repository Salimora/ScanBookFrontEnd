# ScanBookFrontEnd
Scan book Front end assessment.
Using index.html or scanbook.php as main page.

Establish table 
CREATE TABLE `scanbook_front_book` (
  `bookId` int(11) NOT NULL AUTO_INCREMENT,
  `ISBN` varchar(45) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `pageCount` int(11) NOT NULL,
  `readOrNot` int(11) NOT NULL,
  `note` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookId`),
  UNIQUE KEY `ISBN_UNIQUE` (`ISBN`)
)
