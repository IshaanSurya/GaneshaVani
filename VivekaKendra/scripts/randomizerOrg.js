
var seqRandom = new Array();
var seqIdx = -1;
var qCurrIdx=0;
var nCorrects = 0;
var nWrongs = 0;
var txtClr="black";
var dspCong = false;
var myTimer = null;
var timerEve = null;
var milisec=0;
var seconds=0;
var tskCompleted = false
var g_timerTiggerFunc = null ; // Fuction to be called by the timer. This is also used in other scripts like floatObj.js
// -------- Congratulating images-----
var stdImg = new Array(5);
stdImg[0]="../images2/ninja1.gif";	//100%
stdImg[1]="../images2/ninjaTweeter.gif";	//80%	
stdImg[2]="../images2/haveFlowers.gif";		//60%
stdImg[3]="../images2/catlick.gif";	//40%
stdImg[4]="../images2/snore.gif";	//30%


//---------- customize congratulatory Msg
var stdcongMsg = new Array(5);
stdcongMsg[0]="That was Exceptional !!!";	
stdcongMsg[1]="That was Amazing !";	
stdcongMsg[2]="Here, cheer up.";	
stdcongMsg[3]="Do you want to try again?";	
stdcongMsg[4]="You better...";

//---------- customize congratulatory Msg - Kannada
var stdcongkMsg = new Array(5);
stdcongkMsg[0]="ವಾಹ್, ಸಕತ್  ಮಿ೦ಚಿ೦ಗ್.";	//100 %
stdcongkMsg[1]="ಸಕತ್ ಒಳ್ಳೆ   ಪ್ರಯತ್ನ ";	//80%
stdcongkMsg[2]="ಇಗೋ , ಎಚ್ಚೆತ್ಕೋ";	//60%
stdcongkMsg[3]="ಏನು, ಇನ್ನೊಮ್ಮೆ  ಪ್ರಯತ್ನಿ  ಸ್ತೀಯಾ?";	//40%
stdcongkMsg[4]="ನೀನು  ಹೋಗಿ....";	//30%

var stdcongLang= "EK"; //K; //E


/*___________ temp _________________________
var numQues = 4;	// Number of questions
var maxQuestions = 3;	// Maximum number of Qs to pose. cannot be more than numQues.

var answers = new Array(numQues);
var sel = new Array(numQues);
var attempts =0;

var question=new Array(numQues)
question[0]="55 + 67 = ###";
question[1]="410 + 86 = ###";
question[2]="82 + 7 = ###";   
question[3]="94 + 12 = ###";

answers[0]="122";
answers[1]="496";
answers[2]="89";   
answers[3]="106";


var congImg = new Array(5);
congImg[0]="";	//100%
congImg[1]="";	//80%	
congImg[2]="";		//60%
congImg[3]="";	//40%
congImg[4]="";	//30%

//---------- customize congratulatory Msg
var congMsg = new Array(5);
congMsg[0]="";	
congMsg[1]="";	
congMsg[2]="";	
congMsg[3]="";	
congMsg[4]="";

//---------- customize congratulatory Msg - Kannada
var congMsg = new Array(5);
congMsg[0]="";	//100 %
congMsg[1]="";	//80%
congMsg[2]="";	//60%
congMsg[3]="";	//40%
congMsg[4]="";	//30%
var congLang= ""; //K; //E; //EK;

---------------------------------------------------------------------------------------*/
function initRandomizer()
{
	seqIdx = -1;
	qCurrIdx=0
	nCorrects = 0;
	nWrongs = 0;
	//var youA = document.getElementsByName("yourAns");
	//youA[0].value="";
	//(document.getElementById("checkAns").disabled) = true;
	//document.getElementById("startNow").value = "Start";
}

function initTimer()
{
//	myTimer = null;
	myTimer = document.getElementById("myTimer");
	if(myTimer==null)
	{
		return;	// important fro non-timed pages
	}
	if(timerEve != null)
		clearTimeout(timerEve);
	timerEve=null;
	milisec=0;
	seconds=Number(60*myMin);
	var tmstmp = document.getElementById("tmstmp");
	tmstmp.innerHTML= " / " + myMin;
}

function get_random()
{
    var ranNum= Math.floor(Math.random()*(question.length-1));
    return ranNum;
}


function aNonRepRandom()
{
	var rIdx=null;
	do
	{	var callAgain = false;   
		rIdx = get_random();
		for(i=0 ; i<=seqIdx ; i++)
		{	
			if(seqRandom[i] == rIdx)
				callAgain = true;
		}
		if(callAgain == false)
		{	seqIdx ++;
			seqRandom[seqIdx] = rIdx;
			break;
		}
	} while(true);
	return rIdx;
  }

function getAQuestion()
{	var aQ = null;	//alert("Here we are" + aQ);
	if(maxQuestions >= question.length)
	{	alert("Questions less than maxQuestions value. Please correct this.");
	}
	else if(qCurrIdx < maxQuestions)
	{
		qIdx= aNonRepRandom();
		aQ = question[qIdx];
		qCurrIdx++;
	}
	return aQ;
}

function startQuest()
{
	var btnTxt= document.getElementById("startNow");
	if(btnTxt.value == "Restart")
	{
		var r=confirm("Do you really want to restart?");
		if(r==false)
		 	return;
		initRandomizer();
		initTimer();
		btnTxt.value = "Start";
		hideCongratulations();
		//tblExtender("Restarted", "blue");
		statusMsg();
		dspStatistics();
		(document.getElementById("checkAns").disabled) = true;
	}	
	else
	{	
		initRandomizer();
		initTimer();
		g_timerTiggerFunc="stopShow()";
		if(myTimer != null)
		{	
			timerTicks();
		}	
		popQ();	
		btnTxt.value = "Restart";
	}

}

function statusMsg()
{
	var sMsg="";
	var TmSt="";
	if(myTimer!=null)
	{
		TmSt = myMin + "("+ myTimer.value + ") ";
	}
	if(tskCompleted)
	{
		sMsg = "Completed : "  
		tskCompleted = false;
	}
	sMsg = sMsg + TmSt +  " Restarted " 
	tblExtender(sMsg, "blue");


}
function popQ()
{	
	var btnTxt= document.getElementById("startNow");
	var myQis = getAQuestion();
	if(myQis == null || myQis == "" )
	{	stopShow();
		tskCompleted=true;
		//dspStatistics();
		//(document.getElementById("checkAns").disabled) = true;
		//dspCongratulations();
	}	 
	else
	{
		(document.getElementById("checkAns").disabled) = false;
		//btnTxt.value = "Restart";
	}
	splitQuestion(myQis);
}

function splitQuestion(myQis)
{	var qp1 = ""; var qp2="";
var ipBoxp1= "<input style='width: 5cm; height: 1cm; font-size: 14pt; color: blue; text-align: center;' ";
var ipBoxp2= " name='yourAns' size='3'>";
	if( myQis != null && myQis.length>0)
	{
		var ii=0;
		var nHash = myQis.match(/###/gi).length;
		//"Write ### the even numbers (in order) between 9 and 15 ###."; 
		while(true)
		{
			var idx1 = myQis.search(/###/);
			if(idx1==-1)
				break;
			qp1+=myQis.substr(0,idx1);
			var tmp=myQis.substr(idx1+3);
			qp1 += (ipBoxp1 + "id=dynAns" + ii +  ipBoxp2);
			ii++;
			//qp2=myQis.replace(qp1+"###","");
			myQis=tmp;
		}
		spqp1.innerHTML=qp1;
	}
	//embedInputter(qp1,qp2);
}

// The diagonals are ________ and ###
	
function embedInputter(qp1,qp2)
{
	var mytbl = document.getElementById('RandomRange');
	var qcell = mytbl.rows[0].cells[0];
	
	var qsp1 = document.getElementById("spqp1");
	//alert(qsp1.innerHTML);
	qsp1.innerHTML=qp1;
	var qsp2 = document.getElementById("spqp2");
	qsp2.innerHTML=qp2;
	//alert(qsp2.innerHTML);

}


function getTheAnswer()
{
	var elmA = document.getElementsByName("yourAns");
	elmA[0].focus();
	return (elmA[0]); 
}
	

function popA()
{
	var uA = getTheAnswer();
	if(uA.value == "" || uA.value == "null" || uA.value == "undefined")
		return;
	var resArea = document.getElementById("yourResults");
	if(resArea == "undefined" || resArea == "null")
	{
		alert("No result area defined. /r/n Please derive from the specific template");
		return; 
	}
	var resColor="";
	
	if(checkPossibleAns(answers[qIdx],uA.value) == false)
	//if(uA.value != answers[qIdx])
	{
		resColor = "red";
		nWrongs++;
	}
	else
	{
		resColor = "black";
		nCorrects++;
	}
	var qmT = question[qIdx].replace("###","");
	//resArea.innerHTML = resArea.innerHTML + "<div style='color:"+ resColor +"'>" + qCurrIdx + " : " + question[qIdx]  + uA +"</div>" ;
	tblExtender(  qCurrIdx + ") " +  qmT +  uA.value,resColor );
	uA.value = "";
	dspStatistics();
	popQ();
}


function tblExtender(dspMsg,msgClr)
{
	var tbl = document.getElementById('RandomRange');
	var lastRow = tbl.rows.length;
	var row = tbl.insertRow(3);
	var cellLeft = row.insertCell(0);
	cellLeft.style.color=msgClr;
	var textNode = document.createTextNode(dspMsg);
	cellLeft.appendChild(textNode);
}

function dspCongratulations()
{
	if(dspCong == true)
		return;
	var tbl = document.getElementById('RandomRange');
	//var lastRow = tbl.rows.length;
	// if there's no header row in the table, then iteration = lastRow + 1
	//var iteration = lastRow;
	var row = tbl.insertRow(0);
	//dspMsg = dspMsg;
	// left cell
	var cellLeft = row.insertCell(0);
	var conIdx = pickCongratulator();
	var cL = (congLang==null || congLang=="") ? stdcongLang : congLang;
	var eMsg = (congMsg[conIdx] == null || congMsg[conIdx] == "") ? stdcongMsg[conIdx] : congMsg[conIdx];
	//alert(stdcongkMsg[conIdx] + congkMsg[conIdx]);
	var kMsg = (congkMsg[conIdx] == null || congkMsg[conIdx] == "") ? stdcongkMsg[conIdx] : congkMsg[conIdx];
	cMsg = (cL.length==2) ? (eMsg + "<br>" + kMsg) : ((cL[0]=='E')? eMsg : kMsg);
	cMsg = "<big><big>" +cMsg + "<br></big></big>";
	

	var imgNode = document.createElement("img");

	imgNode.src = (congImg[conIdx] == "") ? stdImg[conIdx] : congImg[conIdx];
	imgNode.addEventListener("click",startQuest,false);
	imgNode.style.height="150px";
	cellLeft.appendChild(imgNode);

	var dNode=document.createElement("div");
	dNode.innerHTML= cMsg;//"My Msg <br> He is.";
	dNode.style.color="rgb(204, 0, 0)";
	dNode.style.size="16";

	cellLeft.appendChild(dNode);
	cellLeft.style.textAlign="center";

	dspCong = true;

}

function hideCongratulations()
{
	if(dspCong == false)
		return;
	var tbl = document.getElementById('RandomRange');
	var row = tbl.deleteRow(0);
	dspCong = false;

}

function dspStatistics()
{
	var nQ = document.getElementById('nQues');
	var nC = document.getElementById('nRight');
	var nW = document.getElementById('nWrong');
	
	nQ.value=qCurrIdx;
	nC.value=nCorrects;
	nW.value=nWrongs;
//	dspCong = false;
	pAge=0;
}

function calcPercent()
{
	var nQ = document.getElementById('nQues');
	var nC = document.getElementById('nRight');
	var pc = Math.round(Number(nC.value)*100/Number(nQ.value));
	return pc; 
}

function pickCongratulator()
{	var congIdx=4;
	var pc = Number(calcPercent());
	if (pc == 100)
	{
		congIdx=0;
	}
	else if(pc >= 80)
	{
		congIdx=1;
	}
	else if(pc >= 60)
	{
		congIdx=2;
	}
	else if(pc >= 40)
	{
		congIdx=3;
	}
	return congIdx;
}

function checkPossibleAns(pAns, yAns)
{
	var idx = -1;
	var ans =pAns;
	do
	{
		var theAns
		idx = ans.search(/;/);
		if(idx != -1)
			theAns = ans.substr(0,idx);
		else
			theAns = ans;

		if (yAns == theAns) 
		{
			return true;
		}
		ans = ans.substr(idx+1,ans.length);
	}while (idx !=-1);
	return false;
}

function timerTicks()
{ 

	if (milisec<=0){ 
		milisec=9 
		seconds-=1 
	} 
	if (seconds<=-1){ 
		milisec=0 
		seconds+=1 
	} 
	else 
	milisec-=1 


	var mymm = Math.floor(seconds / 60);
	var myss = Number(seconds) - mymm * 60;
	myTimer.value= mymm + " : " + myss;

	if(Number(seconds)==0)
	{
		seconds=null;
		eval(g_timerTiggerFunc);
		clearTimeout(timerEve);
	}
	else
		timerEve = setTimeout("timerTicks()",100) 
} 

function stopShow()
{
	dspStatistics();
	(document.getElementById("checkAns").disabled) = true;
	dspCongratulations();
	if(timerEve != null)
		clearTimeout(timerEve);
	timerEve=null;
}





