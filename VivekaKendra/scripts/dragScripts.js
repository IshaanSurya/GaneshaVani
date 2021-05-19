/* Element Drag and Drop is cosmetic without the ability to process the data they hold.
For the drag-drop to be meaningful data processing of the dragble elemets should be based on their position. To do this we will need absolute positions of the elements. (Absolute as related to the Document object)

Such properties as style.left, style.top or offsetLeft, offsetTop can be used to get (or set) the position of element within its parent. So to get absolute element's position within document we should move upward on element's tree and add the position of all element's parents (except the latest document element).

These are some issues to be considered:

   1. First, we need to take into account possible scrolling in element's parents and decrease our result accordingly.
   2. Second, there are some distinctions in behavior of different browsers (as usual :-( ). For Internet Explorer we always can just subtract scrolling position of the object stored in element's offsetParent prooperty. But for FireFox we also need to take into consideration all parents accessible by parentNode properties.
   3. Finally, we should take into account the border width for some parent elements. Unfortunately this task is not so easy as it can be supposed especially for Internet Explorer browser.
*/
 
// Begin ------------- Methods for getting absolute Positio of a DOm element ------------
var __userAgent = navigator.userAgent;
var __isIE =  navigator.appVersion.match(/MSIE/) != null;
var __IEVersion = __getIEVersion();
var __isIENew = __isIE && __IEVersion >= 8;
var __isIEOld = __isIE && !__isIENew;

var __isFireFox = __userAgent.match(/firefox/i) != null;
var __isFireFoxOld = __isFireFox && ((__userAgent.match(/firefox\/2./i) != null) || (__userAgent.match(/firefox\/1./i) != null));
var __isFireFoxNew = __isFireFox && !__isFireFoxOld;

var __isWebKit =  navigator.appVersion.match(/WebKit/) != null;
var __isChrome =  navigator.appVersion.match(/Chrome/) != null;
var __isOpera =  window.opera != null;
var __operaVersion = __getOperaVersion();
var __isOperaOld = __isOpera && (__operaVersion < 10);

function __getIEVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function __getOperaVersion() {
    var rv = 0; // Default value
    if (window.opera) {
        var sver = window.opera.version();
        rv = parseFloat(sver);
    }
    return rv;
}

function __parseBorderWidth(width) {
    var res = 0;
    if (typeof(width) == "string" && width != null && width != "" ) {
        var p = width.indexOf("px");
        if (p >= 0) {
            res = parseInt(width.substring(0, p));
        }
        else {
     		//do not know how to calculate other values (such as 0.5em or 0.1cm) correctly now
    		//so just set the width to 1 pixel
            res = 1; 
        }
    }
    return res;
}


//returns border width for some element
function __getBorderWidth(element) {
	var res = new Object();
	res.left = 0; res.top = 0; res.right = 0; res.bottom = 0;
	if (window.getComputedStyle) {
		//for Firefox
		var elStyle = window.getComputedStyle(element, null);
		res.left = parseInt(elStyle.borderLeftWidth.slice(0, -2));  
		res.top = parseInt(elStyle.borderTopWidth.slice(0, -2));  
		res.right = parseInt(elStyle.borderRightWidth.slice(0, -2));  
		res.bottom = parseInt(elStyle.borderBottomWidth.slice(0, -2));  
	}
	else {
		//for other browsers
		res.left = __parseBorderWidth(element.style.borderLeftWidth);
		res.top = __parseBorderWidth(element.style.borderTopWidth);
		res.right = __parseBorderWidth(element.style.borderRightWidth);
		res.bottom = __parseBorderWidth(element.style.borderBottomWidth);
	}
   
	return res;
}
function callMe()
{
	alert("Did U call me?");
}
//returns the absolute position of some element within document
function getElementAbsolutePos(elemID) { 
	var element;
	if (typeof(elemID) == "string")	{
		element = document.getElementById(elemID);
	}
	else {
		element = elemID;
	}

	var res = new Object();
	res.x = 0; res.y = 0;
	if (element !== null) {
        if (__isIENew) {
	    	res.x = element.scrollLeft;
		    res.y = element.scrollTop;
		}
		else {
	    	res.x = element.offsetLeft;
		    res.y = element.offsetTop;
		}
    	
		var offsetParent = element.offsetParent;
		var parentNode = element.parentNode;
		var borderWidth = null;

		while (offsetParent != null) {
			res.x += offsetParent.offsetLeft;
			res.y += offsetParent.offsetTop;
			
			var parentTagName = offsetParent.tagName.toLowerCase();	

			if ((__isIEOld && parentTagName != "table") || (__isFireFoxNew && parentTagName == "td")) {		    
				borderWidth = __getBorderWidth(offsetParent);
				res.x += borderWidth.left;
				res.y += borderWidth.top;
			}
		    
			if (offsetParent != document.body && offsetParent != document.documentElement) {
				res.x -= offsetParent.scrollLeft;
				res.y -= offsetParent.scrollTop;
			}


			//next lines are necessary to support FireFox problem with offsetParent
   			if (!__isIE && !__isOperaOld || __isIENew) {
    				while (offsetParent != parentNode && parentNode !== null) {
					res.x -= parentNode.scrollLeft;
					res.y -= parentNode.scrollTop;
					if (__isFireFoxOld && __isWebKit) {
						borderWidth = __getBorderWidth(parentNode);
						res.x += borderWidth.left;
						res.y += borderWidth.top;
					}
    				parentNode = parentNode.parentNode;
    			}    
			}

   			parentNode = offsetParent.parentNode;
    		offsetParent = offsetParent.offsetParent;
		}
	}
 return res;
}
// End ------------- Methods for getting absolute Positio of a DOm element ------------



/***********************************************
* Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

/*
.drag{
position:relative;
cursor:hand;
z-index: 100;
}
*/

var dragobject={
	z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0, rngPos: null, rngW : null,  rngH : null, 
	initialize:function()	{
		document.onmousedown=this.drag
		document.onmouseup=function()
		{
			this.dragapproved=0;
		}
	},

	drag:function(e){
		var evtobj=window.event? window.event : e
		this.targetobj=window.event? event.srcElement : e.target
		
		// Calculate the drag range.
		if(this.rngPos == null)
		{
			// Strip units that may be.
			var tok=/\d/g;
			var ranger = document.getElementById("MainDragRange");
			var rW =  ranger.style.width.match(tok);
			var rH = ranger.style.height.match(tok);
			var pnW = String(rW);	// Without this conversion replace fails
			var pnH = String(rH);		// Without this conversion replace fails

			this.rngW = pnW.replace(/\,/g,"");	//Replace Commas
			this.rngH = pnH.replace(/\,/g,""); 	// Replace Commas
			this.rngPos = getElementAbsolutePos(ranger);
			//alert(this.rngPos.x+" , " + this.rngPos.y+ " , " + this.rngW + " , " + this.rngH);
		}

		if (this.targetobj.className=="drag"){				
			this.dragapproved=1
			if (isNaN(parseInt(this.targetobj.style.left))){
				this.targetobj.style.left=0
			}
			if (isNaN(parseInt(this.targetobj.style.top))){
				this.targetobj.style.top=0
			}
			this.offsetx=parseInt(this.targetobj.style.left)
			this.offsety=parseInt(this.targetobj.style.top)
			this.x=evtobj.clientX
			this.y=evtobj.clientY
			if (evtobj.preventDefault)
				evtobj.preventDefault()
			document.onmousemove=dragobject.moveit
			//alert (this.targetobj.rngW);
		}
	},

	moveit:function(e){
		var evtobj=window.event? window.event : e
		if (this.dragapproved==1){
			var rl = evtobj.clientX;
			var rt = evtobj.clientY;
			if(e.ctrlKey)
			{ 
				alert("rl=" + rl + ", rt=" + rt + ", xPos=" + this.rngPos.x + ", yPos=" + this.rngPos.y + ", W=" + this.rngW + ", H=" + this.rngH);
			}
			//Limit Drag/Drop range
			//if(rl > this.rngPos.x && rl < this.rngPos.x+ Number(this.rngW)  && rt > this.rngPos.y && rt < this.rngPos.y+Number(this.rngH))
			{
				this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
				this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
				return false
			}
		}
	}
}

