var g_ipid=0;

var g_plotPt = "../images3/blackradio.png";
var g_plotErr = "../images3/redradio.jpeg";

	function initArea(e)
	{
		if (!e) e = window.event;
		var mapLst = document.getElementsByTagName("map")
		for(j=0;j<mapLst.length;j++)
		{
			var areas = mapLst[j].childNodes;
			for (i=0;i<areas.length ; i++)
			{	
				if(areas[i].tagName=="AREA")
				{	// Dynamically assign a listener fucntion, markSpot for the event, Double click. 
					// This is an interesting way of passing 'even object' and the "this object" as parameters.
					areas[i].addEventListener("dblclick", function(e) { markSpot(e,this) }, false);
				}
			}
		}
	}

	function markSpot(e, ip)
	{	
		if (!e) e = window.event;
		var oImg =  document.createElement("img");
		oImg.src=g_plotPt;
		//oImg.type="radio";
		//oImg.checked=true;
		//oImg.style.bgcolor="rgb(153, 0, 0)"; 
		oImg.style.left= e.pageX-10+"px";
		oImg.style.top= e.pageY-10+"px";
		oImg.style.position="absolute";
		oImg.className="plotImg";
		oImg.setAttribute("idx",ip.alt);	// answer idx
		oImg.setAttribute("ans","");	// place holder for answer
		oImg.id = "ip"+(g_ipid++);
		var mapVal=document.getElementById("mapVal");

		mapVal.style.left=e.pageX-30+"px";
		mapVal.style.top=e.pageY-30+"px";
		mapVal.style.position="absolute";
		mapVal.setAttribute("mapId",oImg.id);		// remember the id of the plotPoint
		mapVal.type="text";
		mapVal.size=g_labelW;
		mapVal.value = "";
		//oImg.value = mapVal.value;
		oImg.addEventListener("click",showVal,false);
		oImg.addEventListener("dblclick",delPlot,false);
		ip.parentNode.appendChild(oImg);
		mapVal.focus();
	}

	function showVal()
	{
		var mapVal=document.getElementById("mapVal");
		//alert(this.getAttribute("ans"));
		// show the text box with the plotPoint value
		mapVal.style.left=this.offsetLeft-30+"px";
		mapVal.style.top=this.offsetTop-30+"px";
		mapVal.style.position="absolute";
		mapVal.type="text";
		mapVal.value= this.getAttribute("ans");		//this.alt;	
		mapVal.focus();
		mapVal.setAttribute("mapId",this.id);	
	}
	
	function delPlot()
	{
		if(confirm('Do you want to delete this plot point?'))
			this.parentNode.removeChild(this);	
	}

	function doAction(e,ip,eSrc)
	{	
		var key=null;
		if(window.event) // IE
		{
			keynum = e.keyCode;
		}
		else if(e.which) // Netscape/Firefox/Opera
		{
			keynum = e.which;
		}
		
		// hide the text on Enter or onLoseFocus
		if(eSrc=="blur" || keynum == 13)
		{	
			var mapId = ip.getAttribute("mapId");
			var mapObj = document.getElementById(mapId);
			mapObj.setAttribute("ans",ip.value);
			ip.value="";
			ip.type="hidden";
			//alert(mapObj.getAttribute("idx"));
		}
	}

	function sortByVal(a,b)
	{
		return a.idx-b.idx;
	}

	function checkPlots(frm)
	{
		var score =0
		var srtPlot = new Array(2)
		var srtVal="";
		var pImg = document.getElementsByClassName("plotImg");
		var j=0;
		for (i=0;i<pImg.length;i++)
		{
			var x ;
			x = Number(pImg[i].getAttribute("idx"));
			if(x == 0)
			{
				pImg[i].src=g_plotErr;
			}
			else
			{
				x=x-1;		// Although the value of the alt values of the map areas start from 1 ( No alt value is rendered 0, so has to begin from 1) , the answer index starts with 0. 
				if(check4Match(x, pImg[i]) == 0)
					pImg[i].src=g_plotErr;
				else
				{
					pImg[i].src=g_plotPt;
					score ++;
				}
			}
		}

		if(i < numQues)
			score = validateAnsByName("Non-drag", score, numOptions);
		showStats(score,frm);
	}
	
	function check4Match(x, pImg)
	{	
		var idx = -1;
		var ans = answers[x*1];
		var usrVal = pImg.getAttribute("ans");
		//alert(ans+ " : " + usrVal)
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
			if (usrVal == theAns) 
			{
				found = 1;
				break;
			}
			ans = ans.substr(idx+1,ans.length);
		}while (idx !=-1);
		return found;
	}

	function showStats(score, form)
	{
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


