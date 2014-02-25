function submitId(item_id) {
	var idtext = "itemId=" + item_id;
	var urltext = "content.html?" + idtext;
	$.colorbox({
		iframe : true,
		innerWidth : "880px",
		innerHeight : "580px",
		initialWidth : "880px",
		initialHeight : "580px",
		scrolling : false,
		top : "60px",
		left : "65px",
		title : idtext,
		href : urltext
	});
}

function getDataFromAccessNumber(Accession_number, tagname) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", "contents/extended_label.xml",
			false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	var x = xmlDoc.getElementsByTagName("object");
	for (i = 0; i < x.length; i++) {
		var idNum = x[i].getElementsByTagName("Id")[0].childNodes[0].nodeValue;
		if (idNum === Accession_number) {
			var toreturn = x[i]
					.getElementsByTagName(tagname)[0].childNodes[0].nodeValue;
			return x[i].getElementsByTagName(tagname)[0].childNodes[0].nodeValue;
		}
	}
	return false;
}

function getObjectListFromXML() {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", "contents/extended_label.xml",
			false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	return xmlDoc.getElementsByTagName("object");
}