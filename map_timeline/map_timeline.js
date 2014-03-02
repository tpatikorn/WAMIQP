var xmlFileLocation = "contents/contents.xml"; /* the location of the content xml file */

/**
 * Display a ColorBox popup of the spacified page
 * with specified height and width
 * @param page the page to display
 * @param height the height of the popup
 * @param width the width of the popup
 */
function popUpPage(page, height, width) {
	var urltext = page;
	parent.jQuery.colorbox({
		iframe : true,
		innerWidth : width,
		innerHeight : height,
		initialWidth : 0,
		initialHeight : 0,
		scrolling : false,
		top : 0.5 * (690 - height),
		left : 0.5 * (1010 - width),
		href : urltext
	});
}

/**
 * Display a ColorBox popup of an object
 * with specified (internal) item id
 * @param item_id the item id of the object to be displayed
 */
function submitId(item_id) {
	var idtext = "itemId=" + item_id;
	var urltext = "content.html?" + idtext;
	popUpPage(urltext, 640, 880);
}

/**
 * Retrieve the list of objects from the XML file
 * @returns the list of all objects in XML file
 */
function getObjectListFromXML() {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", xmlFileLocation, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	return xmlDoc.getElementsByTagName("Object");
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
	var objectList = getObjectListFromXML();
	for (i = 0; i < objectList.length; i++) {
		var idNum = objectList[i].getElementsByTagName('ID')[0].childNodes[0].nodeValue;
		if (idNum === Accession_number) {
			if(tagname === "Object") {
				return objectList[i];
			}
			else {
				return objectList[i].getElementsByTagName(tagname)[0].childNodes[0].nodeValue;				
			}
		}
	}
	return false;
}

function CSVparser(CSV) {
	var retArray = new Array();
	var index = CSV.indexOf(",");
	while(index > -1) {
		var val = CSV.substring(0,index);
		retArray.push(val);
		CSV = CSV.substring(index+1);
		index = CSV.indexOf(",");
	}
	retArray.push(CSV);
	return retArray;
}

function is_touch_device() {
	return !!('ontouchstart' in window);
}