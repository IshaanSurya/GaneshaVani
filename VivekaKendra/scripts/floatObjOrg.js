
var g_qIdx = 0;	//question index.
var g_fRng = 0

var g_rtAns = 5;
var g_wrAns = -5;
var g_movTime = 70; // Limit (10 fastest - 200 slowest) 
var g_wrBtnVal = "No";
var g_weBtn = null;

/* //----------------- Implementation as two Dimentional Array --------------------
qList[0] = ["Pick the Odd numbers.",4];	ansOptList[0] =ansOpt1;	ansList[0] = ["Y","N","N","Y","Y","Y","Y","N"];
qList[1] = ["Pick the Prime numbers.",3];	ansOptList[1] =ansOpt1;	ansList[1] = ["N","N","N","Y","Y","Y","Y","N"];
qList[2] = ["Pick the Multiples of 5.",2];	ansOptList[2] =ansOpt2;	ansList[2] = ["Y","N","N","Y","Y","Y","Y","N"];
qList[3] = ["Pick the Even numbers.",6];	ansOptList[3] =ansOpt1;	ansList[3] = ["Y","N","N","Y","Y","Y","Y","N"];
---------------------------------------------------------------------------------------*/

/***********************************************
* Floating image script- By Virtual_Max (http://www.geocities.com/siliconvalley/lakes/8620)
* Modified by Dynamic Drive for various improvements
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
* Extensively changed and adapted for SRVK use by Aroon.
***********************************************/
var vmin=2;
var vmax=5;
var vr=2;
var timer1;

/*function getFlyRange(){
g_fRng = document.getElementById("FlyRange"); 
if( g_fRng == null)
	alert("Range is null");
return g_fRng;

}*/

function initFields()
{
	var qF = document.getElementById("qField");
	qF.value="Press Start to begin. ";
	var ansF = document.getElementById("ansField");
	ansF.value=0;
	var scrKeeper = document.getElementById("scoreKeeper"); 
	scrKeeper.value = 0;
	var tblPts = document.getElementById("tabledPts"); 
	tblPts.value = 0;

	g_fRng = document.getElementById("FlyRange"); 
	if( g_fRng == null)
	alert("Range is null");

	g_wrBtnVal = "No";
	g_weBtn = null;

	g_rtAns = (l_rtAns == null || l_rtAns == undefined) ? 5: l_rtAns;
	g_wrAns = (l_wrAns == null || l_wrAns == undefined) ? 0: l_wrAns;
	g_movTime = (l_movTime == null || l_movTime == undefined) ? 70: l_movTime;

	g_timerTiggerFunc = "clearFloats()";	// g_timerTiggerFunc is defined in randomizer.js
}

/*
This functions dynamically creates float buttons. Answers corresponding to a questions are set as button values. Answer buttons id are set to "@". The click event check if the clicked buttons id="@" to detrmine the correct answers
*/

function createFloaters()
{
	/*
<div id="flyimage3" style="position: absolute; left: -500px; width: 47px; height: 68px;">
<input value="Ishaan" size="5" onclick="showPos(this)" style="color: rgb(153, 0, 0); font-size: 16pt;" type="text" readonly="readonly" class="floater"></div>
	*/
	var i=0;
	var nCorAns=0;
	for(j=0;j<nAnsOpt;j++)
	{	
		i++;
		var divFlt = document.createElement("div");
		//divFlt = new Chip("flyimage1",47,68);
		var parm = "=new Chip(" + "'flyimage" + i + "',47,68)";
		eval( "flyimage" + i +parm);		//create a new Chip programatically 
		divFlt.id="flyimage"+i ;			// Assign the id
		divFlt.style.position="absolute"; 
		divFlt.style.left= "-500px"; 
		divFlt.style.width= "47px;"
		divFlt.style.height= "68px;"
		
		var Fltr =  document.createElement("input");
		var fldVal = ansOptList [g_qIdx] [j]; 
		Fltr.id="N";
		if(fldVal[0] == '@')
		{	
			Fltr.id="@";
			fldVal = fldVal.slice(1,fldVal.length);
			nCorAns ++;
		}
		Fltr.value = fldVal;	//ansOpt[j]; 
		//alert(Fltr.value);
		eval("flyimage" + i +".isAnAns='Yes this is a valid option'");
		Fltr.size=(Fltr.value.length>3)?Fltr.value.length-2:Fltr.value.length;
		Fltr.style.color="rgb(153, 0, 0)"; 
		Fltr.style.fontSize="16pt";	
		Fltr.type="button";

		//Fltr.readOnly=true;
		Fltr.className="floater";
		Fltr.addEventListener("click",processClick,false);
		divFlt.appendChild(Fltr);
	
		//var fRng = document.getElementById("FlyRange"); 
		g_fRng.appendChild(divFlt);
		//g_fRng.appendChild(Fltr);
		var chipNm = "flyimage"+i;
		movechip(chipNm);
	}
	return nCorAns;
}

function beginFloats(meObj)
{
//Step 2: Using the same variable names as 1), add or delete more of the below lines (60=width, height=80 of image):
	var nCorAns=0;
	//alert(g_qIdx + " : " + qList.length);
	if(g_qIdx >= qList.length)	
	{
		meObj.value="Done";
		return;
	}

	if(meObj.value=="Start")
	{
		nCorAns = createFloaters();
		meObj.value="Next";
	}
	else
	{
		var fltr = document.getElementsByClassName("floater");
		for(i=0;i<fltr.length;i++)
		{	
			fldVal = ansOptList [g_qIdx] [i];
			fltr[i].id="N";
			if(fldVal[0] == '@')
			{	
				fltr[i].id="@";
				fldVal = fldVal.slice(1,fldVal.length);
				nCorAns ++;
			}
			fltr[i].value=fldVal;	//ansOpt[j]; 
			fltr[i].type=flyimage1.orgType;
		}
	}
	var qF = document.getElementById("qField");
	qF.value=qList[g_qIdx][0];
	g_qIdx ++;	// bump the question number;

	var ansF = document.getElementById("ansField");
	ansF.value=nCorAns;
	var tblPts = document.getElementById("tabledPts"); 
	tblPts.value = Number(tblPts.value) + (nCorAns * g_rtAns);

	if( myMin !=undefined && myMin != null && myMin !=0)	// If a timed float then proceed
	{
		initTimer();	//  defined in randomizer.js
		if(myTimer != null )
		{	
			timerTicks();	//  defined in randomizer.js
		}	
	}
}


function Chip(chipname,width,height)
{
	this.named=chipname;
	this.vx=vmin+vmax*Math.random();
	this.vy=vmin+vmax*Math.random();
	this.w=width+20;
	this.h=height;
	this.xx=0;
	this.yy=0;
	this.timer1=null;
	this.orgType="button";
	this.className = "floater"
	this.isAnAns="No";
}

function processClick(meObj)
{
	//var fRng = document.getElementById("FlyRange"); 
	if(g_fRng != null )
	{	
		var scrKeeper = document.getElementById("scoreKeeper"); 
		if(this.id=="@" && scrKeeper != null)
		{
			this.orgType=meObj.type;
			this.type="hidden";
			scrKeeper.value = scrKeeper.value * 1 + g_rtAns;
			var ansF = document.getElementById("ansField");
			ansF.value = Number(ansF.value)-1;
			if(Number(ansF.value) == 0)
				clearFloats();
		}
		else
		{	
			g_wrBtnVal = this.value;
			g_weBtn = this;
			this.value = "No";
			var t=setTimeout("changeBack()",100);	// flash "No" on wrong clicks 
			scrKeeper.value = scrKeeper.value * 1 + g_wrAns;
		}
	}		
}

function changeBack()
{	//alert(g_weBtn.value);
	g_weBtn.value = g_wrBtnVal;
	g_weBtn = null;
}
	

function clearFloats()
{
	var fltr = document.getElementsByClassName("floater");
	if(fltr != null)
	{
		for(i=0;i<fltr.length;i++)
		{
			if(fltr[i].type != "hidden")
				fltr[i].type = "hidden";
		}
	}
}
	

function movechip(chipname)
{
	if (document.getElementById)
	{
		eval("chip="+chipname);
		//var fRng = document.getElementById("FlyRange"); 
		if(g_fRng != null)
		{
			var fRngPos =getElementAbsolutePos(g_fRng)
			pageX=fRngPos.x;
			pageW= parseInt(g_fRng.style.width)-20; 
			pageY=fRngPos.y;
			pageH= parseInt(g_fRng.style.height)-20;
		}		

		chip.xx=chip.xx+chip.vx;
		chip.yy=chip.yy+chip.vy;

		chip.vx+=vr*(Math.random()-0.5);
		chip.vy+=vr*(Math.random()-0.5);
		if(chip.vx>(vmax+vmin))  chip.vx=(vmax+vmin)*2-chip.vx;
		if(chip.vx<(-vmax-vmin)) chip.vx=(-vmax-vmin)*2-chip.vx;
		if(chip.vy>(vmax+vmin))  chip.vy=(vmax+vmin)*2-chip.vy;
		if(chip.vy<(-vmax-vmin)) chip.vy=(-vmax-vmin)*2-chip.vy;

		if(chip.xx<=pageX)
		{
			chip.xx=pageX;
			chip.vx=vmin+vmax*Math.random();
		}
		if(chip.xx>=pageX+pageW-chip.w)
		{
			chip.xx=pageX+pageW-chip.w;
			chip.vx=-vmin-vmax*Math.random();
		}
		if(chip.yy<=pageY)
		{
			chip.yy=pageY;
			chip.vy=vmin+vmax*Math.random();
		}
		if(chip.yy>=pageY+pageH-chip.h)
		{
			chip.yy=pageY+pageH-chip.h;
			chip.vy=-vmin-vmax*Math.random();
		}

		document.getElementById(chip.named).style.left=chip.xx+"px";
		document.getElementById(chip.named).style.top=chip.yy+"px";
		chip.timer1=setTimeout("movechip('"+chip.named+"')",g_movTime);
	}
}



