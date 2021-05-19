/* Element Drag and Drop is cosmetic without the ability to process the data they hold.
For the drag-drop to be meaningful data processing of the dragble elemets should be based on their position. To do this we will need absolute positions of the elements. (Absolute as related to the Document object)

Such properties as style.left, style.top or offsetLeft, offsetTop can be used to get (or set) the position of element within its parent. So to get absolute element's position within document we should move upward on element's tree and add the position of all element's parents (except the latest document element).

These are some issues to be considered:

   1. First, we need to take into account possible scrolling in element's parents and decrease our result accordingly.
   2. Second, there are some distinctions in behavior of different browsers (as usual :-( ). For Internet Explorer we always can just subtract scrolling position of the object stored in element's offsetParent prooperty. But for FireFox we also need to take into consideration all parents accessible by parentNode properties.
   3. Finally, we should take into account the border width for some parent elements. Unfortunately this task is not so easy as it can be supposed especially for Internet Explorer browser.
*/
var g_noSnap;
var tollerance=2;
 
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

var dragdupeobject={
	z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0, rngPos: null, rngW : null,  rngH : null, dropped : null,
	initialize:function()	{
		document.onmousedown=this.drag
		document.onmouseup= this.mouseIsUp
	},

	mouseIsUp:function(e)
	{
		var evtobj=window.event? window.event : e
		//this.targetobj=window.event? event.srcElement : e.target

			this.dropped=true;
			this.dragapproved=0; 
			this.targetobj.position="relative";
			if(evtobj.ctrlKey && this.targetobj.name=="cloned")
			{	if(confirm('Do you want to delete this object?'))
					this.targetobj.parentNode.removeChild(this.targetobj);
			}
	},

	drag:function(e){
		var evtobj=window.event? window.event : e
		this.targetobj=window.event? event.srcElement : e.target
		
		// Calculate the drag range.
		if(this.rngPos == null)
		{
			// Strip units that may be.
			var ranger = document.getElementById("MainDragRange");
			this.rngW = parseInt(ranger.style.width);
			this.rngH =  parseInt(ranger.style.height);
			this.rngPos = getElementAbsolutePos(ranger);
			//alert(this.rngPos.x+" , " + this.rngPos.y+ " , " + this.rngW + " , " + this.rngH);
		}
		
		if (this.targetobj.className=="dragDupe"){				
			//this.dragapproved=1
			if(this.dropped == null)
			{
				this.dropped = true;
			}
			if(this.dropped == true )
			{				
				var clonedNode=this.targetobj.cloneNode(true);		
				//clonedNode.value = this.targetobj.value + "C";
				clonedNode.className="drag";
				clonedNode.onmousemove=dragdupeobject.moveit;
				clonedNode.onmousedown = dragdupeobject.drag;
				clonedNode.onmouseup=dragdupeobject.moveup;
				var pPos = getElementAbsolutePos(this.targetobj.parentNode);
				var dPos = getElementAbsolutePos(this.targetobj);
				clonedNode.style.zindex=99
				clonedNode.style.left=Math.abs(dPos.x)+3;
				clonedNode.style.top=Math.abs(dPos.y)+3;
				clonedNode.style.position = "absolute";
				clonedNode.name = "cloned";

				//alert(clonedNode.style.left+ " , "+ this.targetobj.style.left)
				this.targetobj.parentNode.appendChild(clonedNode);

				//if (clonedNode.setCapture) {
				//	clonedNode.setCapture();
				//}
				//this.targetobj = clonedNode;
				this.dropped = false;
			}
		}

		if (this.targetobj.className=="drag"){	
			if (this.dropped == true)			
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
			document.onmousemove=dragdupeobject.moveit
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
				//alert("rl=" + rl + ", rt=" + rt + ", xPos=" + this.rngPos.x + ", yPos=" + this.rngPos.y + ", W=" + this.rngW + ", H=" + this.rngH);
			}
			//Limit Drag/Drop range
			//if(rl > this.rngPos.x && rl < this.rngPos.x+ Number(this.rngW)  && rt > this.rngPos.y && rt < this.rngPos.y+Number(this.rngH))
			{
				this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
				this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
				return false
			}			
			//if(this.dropped == false)
			//	this.dropped = true;

		}
	}
}

/******************************************************************
Function to snap/align the dragged objects to the nearest row border. 
This is done to facilitate easy Data processing on the dragged objects. 
Remember dragged objects position is a critical aspects to the processing sequence.
******************************************************************/
function snapToRow()
{  
        var dgObjs = document.getElementsByClassName("drag"); 
	var pp = dgObjs[0];
	do
	{	var np = pp.parentNode;
		pp = np;
		if (pp.nodeName.toLowerCase() != "table")
			continue;
		break;
	} while (true);
        var snpRows = pp.getElementsByTagName("tr"); //alert(snpRows.length);// Get Rows for Parent table
	for( k=(snpRows.length-1);k>=0;k--)	// In the reverse order of the acquired rows (from last row)
	{
		var chDrgs = snpRows[k].getElementsByClassName("drag"); // Get the drags for the row
		for (j=0; j<chDrgs.length;j++)
		{	var dObjPos = getElementAbsolutePos(chDrgs[j]); // Compare the current drag position with the row positions
			for(i=(snpRows.length-1);i>=0;i--)
			{	var tdPos = getElementAbsolutePos(snpRows[i]);
				//alert(dObjPos.y  +"< , >" + tdPos.y + " i = "+ i + " j= " + j+ "OrgTop=" + chDrgs[j].style.top);
				if(dObjPos.y > tdPos.y)
				{	
					if(chDrgs[j].name=="cloned")
						chDrgs[j].style.position="absolute";
					else
						chDrgs[j].style.position="relative";
	
					chDrgs[j].style.top = parseInt(chDrgs[j].style.top) - (dObjPos.y-tdPos.y)*1 + tollerance;
					tdPos=getElementAbsolutePos(snpRows[i]);
					dObjPos=getElementAbsolutePos(chDrgs[j]);
					//alert(tdPos.y+","+dObjPos.y + " , top= " + chDrgs[j].style.top);
					break;
				}
			}
		}
	}
}
/*
function checkMulValuesByName(form) 
{
	var score = 0;
	var elmSorted = new Array(numQues);
	snapToRow();
	var tblObj = document.getElementById("MainDragRange");
	if(tblObj == null)
		return;
	var cellObjs = tblObj.getElementsByTagName("TD")
	if(cellObjs == null)
		return;

	var ansIdx = 0;
	for (k=0; k<cellObjs.length; k++) 
	{	var dragObjs = cellObjs[k].getElementsByClassName("drag");
		var valStr = "";	//dragObjs.length + " : ";
		
		if(dragObjs.length <=0)	
			continue;
		ansIdx ++;
		for (j=0; j<dragObjs.length; j++)
		{	valStr = valStr + dragObjs[j].value;
		}
		alert(dragObjs.length + " -> " +valStr + " -> " +answers[ansIdx]);
		//for (i=0; i<numQues; i++) 
		{	var idx = -1;	var ans = answers[ansIdx];	var found = 0;
			do
			{	//alert("In to Do loop");
				var theAns
				idx = ans.search(/;/);
				if(idx != -1)
					theAns = ans.substr(0,idx);
				else
					theAns = ans;
		    		if (valStr == theAns) 
				{
					score++;
					for (j=0; j<dragObjs.length; j++)
					{	
	     					dragObjs[j].style.borderColor="";
					}
	      				found = 1;
	      				break;
	    			}
				ans = ans.substr(idx+1,ans.length);
			}while (idx !=-1);
	
	    		if (found==0)
	    		{
				for (j=0; j<dragObjs.length; j++)
				{	
			    		dragObjs[j].style.borderColor = "#FF0000";
				}
	   		}
	  	}
	}
	if(attempts >3)
	{
		DisableAll(form,"True")
	}
	else
	{
		attempts = attempts*1 + 1;
	}
	form.attempts.value = attempts; 
	form.percentage.value = score; //+ "%";
	form.questions.value = numQues;
}
*/

function sortByPos(a,b)
{
	var Comp = a.y - b.y;
	if(Math.abs(Comp)<=tollerance)
		Comp = a.x - b.x;
	return Comp;
}

function checkMulValuesBySum(form,snap) 
{
	checkMulValuesByName(form,snap,'+');
}

function checkMulValuesByName(form,snap,op) 
{
	var dgObjOrder = new Array();
	//dgObjOrder[dgObjOrder.length] = {period: "q1", region: "east", total: 2300};
	//sales[sales.length] = {period: "q2", region: "east", total: 3105};
	//sales[sales.length] = {period: "q4", region: "west", total: 3810};

	var score = 0;
	//var elmSorted = new Array(numQues);
	//if(g_noSnap==undefined)
	if(arguments.length == 1)	// Don't snap if there is a second argument. 
	{
		//alert(arguments.length);
		snapToRow();
	}
	var tblObj = document.getElementById("MainDragRange");
	if(tblObj == null)
		return;
	var cellObjs = tblObj.getElementsByTagName("TD")
	if(cellObjs == null)
		return;

	var dragObjs = tblObj.getElementsByClassName("drag");
	if(dragObjs == null)	
		return;
	for(k=0;k<dragObjs.length;k++)
	{	var dgPos = getElementAbsolutePos(dragObjs[k]);
		dgObjOrder[k] = {x: dgPos.x, y: dgPos.y, dgObj: dragObjs[k] , ansSeq:0};
	//	alert(dgObjOrder[k].dgObj.value);
	}
	dgObjOrder.sort(sortByPos);
		
	var yToll = dgObjOrder[0].y;
	var ansStr;
	var orderedAns = new Array();
	var dgSeq=0;
	var cellSeq=0;
	var aSeq = 0;

	if(op=="+")
		ansStr=0;
	else
		ansStr="";
	
	for (i=cellSeq; i<cellObjs.length; i++) 
	{	
		var tdPos = getElementAbsolutePos(cellObjs[i]);
		var tdSpanx = Number(tdPos.x) +parseInt(cellObjs[i].clientWidth);	//calculate the cell sapn.
		var tdSpany = Number(tdPos.y) +parseInt(cellObjs[i].clientHeight);
		//alert( i + " , " + tdSpanx + tdSpany);
		for(k=dgSeq;k<dgObjOrder.length;k++)
		{
			//var tdSpany = Number(tdPos.y) + parseInt(cellObjs[i].clientHeight);
			//alert(Math.abs(dgObjOrder[k].y-yToll) + ", " + tollerance+ ", " + dgObjOrder[k].x + ", " +tdPos.x + ", " +dgObjOrder[k].x+ ", " +tdSpanx)
			/*if(arguments.length != 1)
			{
				//alert(Math.abs(dgObjOrder[k].y-yToll) + " -- " +  tollerance);
				tollerance =Math.abs(dgObjOrder[k].y-yToll);
			}*/

			if(Math.abs(dgObjOrder[k].y-yToll) <= tollerance && dgObjOrder[k].x >Number(tdPos.x) && dgObjOrder[k].x < tdSpanx && dgObjOrder[k].y < tdSpany)
			{
				if(op=="+")
				{
					var dgVal = dgObjOrder[k].dgObj.getAttribute("value");
					if(isNaN(dgVal))
					{
						alert("Value Error - Drag item should a number value :" + dgVal);
						return;
					}
					ansStr = ansStr*1 + dgVal*1;
				}
				else
				{
				ansStr = ansStr + dgObjOrder[k].dgObj.getAttribute("value");//dgObjOrder[k].dgObj.value;
				}
				dgObjOrder[k].ansSeq=aSeq;
				//aSeq ++;
				dgSeq++;	
				//alert(ansStr);
			}
			else
			{	//cellSeq ++;
				if(op=="+")
				{
					if(isNaN(ansStr))
					{
						alert("Value Error - Drag item should a number value :" + ansStr);
						return;
					}
					else if(ansStr != 0)
					{
						ansStr = ansStr*1;
						orderedAns[orderedAns.length] = ansStr;
						alert("ans is " + orderedAns[(orderedAns.length)-1]);
						aSeq++;
						dgObjOrder[k].ansSeq=aSeq;
						ansStr = 0;//dgObjOrder[k].dgObj.value;
						yToll = dgObjOrder[k].y;
						break;
					}
				}
				else if(ansStr.length > 0)
				{	//alert(aSeq + ") " + ansStr);
					orderedAns[orderedAns.length] = ansStr;
					aSeq++;
					dgObjOrder[k].ansSeq=aSeq;
					ansStr = "";//dgObjOrder[k].dgObj.value;
					yToll = dgObjOrder[k].y;
					break;
				}
			}
		}
		//alert(i + " ) " + ansStr);
	}
	if(ansStr.length >0)
	{//	alert(aSeq + " : " + ansStr);
		orderedAns[orderedAns.length] = ansStr;
	}

	for(a=0;a<orderedAns.length;a++)
		alert(a + ") " + orderedAns[a]);
	
	var i=0
	for (i=0; i<orderedAns.length; i++) 
	{
		//alert("Out of 3rd loop");
		var idx = -1;
		var ans = answers[i];
		var found = 0;
		do
		{
			//alert("In to Do loop");
			var theAns
			//alert(ans);
			idx = ans.search(/;/);
			if(idx != -1)
				theAns = ans.substr(0,idx);
			else
				theAns = ans;
				
			//alert(orderedAns[i] +" A Match? " + theAns);
	    		if (orderedAns[i] == theAns) 
			{
			//	alert(orderedAns[i] +" A Match? " + theAns);
				score++;
				for(k=0;k<dgObjOrder.length;k++)
				{
					if(dgObjOrder[k].ansSeq == i)
     						dgObjOrder[k].dgObj.style.borderColor="";
				}
      				found = 1;
      				break;
    			}
			ans = ans.substr(idx+1,ans.length);
		}while (idx !=-1);
		
    		if (found==0)
    		{
			for(k=0;k<dgObjOrder.length;k++)
			{
				if(dgObjOrder[k].ansSeq == i)
					dgObjOrder[k].dgObj.style.borderColor = "#FF0000";
			}
   		}
  	}
	if(i < numQues)
		score = validateAnsByName("Non-drag",score, i);
	if(attempts >3)
	{
		DisableAll(form,"True")
	}
	else
	{
		attempts = attempts*1 + 1;
	}
	//alert("ok");
	form.attempts.value = attempts; 
	form.percentage.value = score; //+ "%";
	form.questions.value = numQues;

}


function validateAnsByName(classNm, score, ansIdx)
{
	var nmObjs = null;
	nmObjs =  document.getElementsByClassName(classNm);
	if(nmObjs.length == 0)	
		return score;
	for (i=0; i<numQues-ansIdx; i++) 
	{
		var answer = nmObjs[i].value;
		var answer_length = answer.length;
		var last_char = answer.charAt(answer_length-1);
		if (last_char == " ") 
		{
			nmObjs[i].value = (answer.substring(0, answer_length-1)) ; 
			i=i-1;
		}
	}
  	for (i=0; i<numQues-ansIdx; i++) 
	{
		var idx = -1;
		var ans = answers[ansIdx+i];
		var found = 0;
		do
		{
			var theAns
			//alert(ans);
			idx = ans.search(/;/);
			if(idx != -1)
				theAns = ans.substr(0,idx);
			else
				theAns = ans;

			//alert("FieldVal = " + form.elements[i].value , ",  Answer = " + theAns);
			if (nmObjs[i].value == theAns) 
			{
				score++;
				nmObjs[i].style.borderColor="";
				found = 1;
				break;
			}
			ans = ans.substr(idx+1,ans.length);
		}while (idx !=-1);

		if (found==0)
		{
			nmObjs[i].style.borderColor = "#FF0000";
		}
  	}
	return score;
}

