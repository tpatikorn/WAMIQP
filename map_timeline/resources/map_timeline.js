function popUpPage(page, height, width) {
	var urltext = page;
	parent.jQuery.colorbox({
		iframe : true,
		innerWidth : width + "px",
		innerHeight : height + "px",
		initialWidth : "0px",
		initialHeight : "0px",
		scrolling : false,
		top : 0.5 * (690 - height) + "px",
		left : 0.5 * (1010 - width) + "px",
		href : urltext
	});
}

function submitId(item_id) {
	var idtext = "itemId=" + item_id;
	var urltext = "content.html?" + idtext;
	popUpPage(urltext, 600, 880);
}

/**
 * Find an object with Accession_number and 
 * return the data of tagname
 * If tagname === "Object", the whole object is returned instead
 * @param Accession_number the accession number of the object
 * @param tagname the name of the tag
 * @returns the data from specified tag name
 */
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
			if(tagname === "Object") {
				return x[i];
			}
			else {
				return x[i].getElementsByTagName(tagname)[0].childNodes[0].nodeValue;				
			}
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

function integerCSVparser(CSV) {
	var retArray = new Array();
	var index = CSV.indexOf(",");
	while(index > -1) {
		var val = parseInt(CSV.substring(0,index));
		alert("val"+val);
		retArray.push(val);
		CSV = CSV.substring(index+1);
		index = CSV.indexOf(",");
	}
	var val = parseInt(CSV);
	alert("val"+val);
	retArray.push(val);
	return retArray;
}