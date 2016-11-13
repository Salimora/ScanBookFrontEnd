//search book from GoogleBook.API
function bookSearch(isbn){
	

	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=isbn" + isbn,
		dataType: "json",
		
		success: function(data){
			
			var title = data.items[0].volumeInfo.title;
			var author = data.items[0].volumeInfo.authors;
			var pageCount = data.items[0].volumeInfo.pageCount;
			var str = "";
			console.log(author);
			console.log(pageCount);
			console.log(title);
			
			str += "<thead><tr><td width='200'>ISBN</td><td width='200'>Title</td><td width='200'>Author</td><td width='200'>PageCount</td>"
            +"<td width='200'>ReadOrNot</td><td width='200'>Note</td></tr></thead><tbody><tr><td height='50'>"+isbn+"</td><td>" +title+"</td><td>"+author+"</td><td>"+pageCount+
			"</td><td><input id='readingMark' /></td><td><input id='addNote' /></td></tr><tr><td height='30' align='center' colspan='6'>"+
			"<button id='saveBookButton' onClick='saveBookInfo(\"" +title +"\",\"" +author+"\",\""+pageCount+ "\")'>Save Book Information</button></td></tr></tbody>";
			$(table).append(str);
			console.log("from google");

			
		}, 
		error: function(){
			alert("error");
		},

		type: 'GET'
	});
}


//save book info to table
function saveBookInfo(title,author,pageCount){
	var isbn = document.getElementById('search').value;
	var changeReadStatus = document.getElementById('readingMark').value;
	var changeNote = document.getElementById('addNote').value;
	console.log(changeReadStatus);
	console.log(changeNote);
	if(changeReadStatus == "YES" || changeReadStatus =="yes"){
		changeReadStatus = 1;
	} else {
		changeReadStatus = 0;
	}
	$.ajax({
		url: "insertBook.php?q=" + isbn + "&title="+title +"&author="+author+"&pageCount="+pageCount+"&readOrNot="+changeReadStatus+"&note="+changeNote,
		dataType: "json",
		
		success: function(data){
			
			console.log(data);
			alert("Book is saved in your library.");
			$("#saveBookButton").replaceWith("<button id='updateBookInfoButton' onClick='updateBookInfo()'>Update Book Information</button>");
		},
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	console.log(XMLHttpRequest);
        	
        },
        type: 'GET'
	});
}

//check ISBN format
function checkISBN(){
	var isbn = document.getElementById('search').value;
	var check = new RegExp( "9\\d{12}");
	isbn.charAt(0);
	if(check.test(isbn)){
		if(checkISBNWeightSum(isbn)){	
		//if isbn is right, check current book in database		
			checkDataBase(isbn);
		} else {
			alert("Oops, ISBN is not a match.");
		}
	} else {
		alert("Oops, ISBN is not a match.");
	}
}


function checkISBNWeightSum(isbn){
	var right = false;
	var verificationCode = isbn.charAt(12)
	var cal = isbn.charAt(0)*1 + isbn.charAt(1)*3 + isbn.charAt(2)*1 + isbn.charAt(3)*3 + isbn.charAt(4)*1 + isbn.charAt(5)*3 +
	 isbn.charAt(6)*1 + isbn.charAt(7)*3 + isbn.charAt(8)*1 + isbn.charAt(9)*3 + isbn.charAt(10)*1 + isbn.charAt(11)*3;
	var cal2 = cal % 10;
	var result = 10 -cal2;
	
	if(result == verificationCode ){
		right = true;
	} else if(verificationCode==0 && result == 10){
		right = true;
	} else {
		right = false;
	}
	return right;
}

//search book in local database 
function checkDataBase(isbn){
	
	$.ajax({
        url: "searchDatabase.php?q="+isbn, 
        dataType: "json", 
        
        success: function(data){
            var bookInfo = "";
            var reading = "No";
            if(data.readOrNot == 1){
            	reading = "Yes";
            }
            console.log("note:"+data.note);
            var userNote = "";
            if(data.note!="" && data.note != "undefined" && data.note!= null){
            	userNote = data.note;
            }
            
			console.log("from database");
			console.log(data);
			console.log(data.exist);
            
            bookInfo += "<thead><tr><td width='200'>ISBN</td><td width='200'>Title</td><td width='200'>Author</td><td width='200'>PageCount</td>"
            +"<td width='200'>ReadOrNot</td><td width='200'>Note</td></tr></thead><tbody><tr><td height='50'>"+data.ISBN+"</td><td>" +data.title+"</td><td>"+data.author+"</td><td>"+data.pageCount
			+ "</td><td>" + "<input id='readingMark' value='"+ reading + "'/></td><td><input id='addNote' value='" + userNote + "'/></td></tr>"
			+"<tr><td height='30' align='center' colspan='6'><button id='updateBookInfoButton' onClick='updateBookInfo()' >Update Book Information</button></td></tr></tbody>";
			$(table).append(bookInfo);
            
            

        },
        error: function(){
        	//if book is not in local database, using Googlebook.API search
        	bookSearch(isbn);
        }
    });
    
}

function updateBookInfo(){
	var isbn = document.getElementById('search').value;
	var changeReadStatus = document.getElementById('readingMark').value;
	var changeNote = document.getElementById('addNote').value;
	console.log(changeReadStatus);
	console.log(changeNote);
	if(changeReadStatus == "NO" || changeReadStatus == "no"){
		changeReadStatus = 0;
	} else {
		changeReadStatus = 1;
	}
	$.ajax({
        url: "updateBookInfo.php?q="+isbn+"&readingStatus="+changeReadStatus +"&note="+changeNote, 
        dataType: "json", 
        
        success: function(data){
        	console.log(data);
            alert("Update Completed");

        }
    });
	
}


document.getElementById('findISBNButton').addEventListener('click', checkISBN, false);