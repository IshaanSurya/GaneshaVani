function initDataOnly()
{
	var sc = initDynData();
	if(sc != null)
		sc.addEventListener("load",setTitleInst);
}


function initData_n_Presentation()
{
	var sc = initDynData();
	sc.addEventListener("load",chgH);
}

function initDynData() {
	url = window.location.search;
	const urlParams = new URLSearchParams(url);
	const dDF = urlParams.get('dynDataFileNm')
	var dDFNm = decodeURIComponent(dDF);
	var sc = loadDynQs(dDFNm);
	return sc;

/*
var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
    
  });
  disParam.innerHTML = result;
  return result;
*/
}

function loadDynTopImg ()
{
	if(!(typeof g_fltTopImg === "undefined") && !(typeof fltTopImg === "undefined") && g_fltTopImg !="" )
	{	
	var s = document.createElement("img");
	s.src = g_fltTopImg;
	s.innerHTML = null;
	s.id = "ImgWidget";
	// after dynamically loading js file,try accessing a var in it. 
	// s.addEventListener("load",chgH); 
	var imgDiv = document.getElementById("fltTopImg");
	imgDiv.appendChild(s);
	}

}

function loadDynQs(dDFile)
{
//dynFl.src="pocDynFl.js";
	if((typeof dynHeadId === "undefined") || dynHeadId !="" )
	{
		return null;
	}
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = dDFile;
	s.innerHTML = null;
	s.id = "ScrWidget";
	// after dynamically loading js file,try accessing a var in it. 
	// s.addEventListener("load",chgH); 
	dynHeadId.appendChild(s);
	return s;
}

function chgH()
{
	//disParam.innerHTML = ddOption[0][1];// This is teachers Data js file with Q/A is loaded.
	loadQs();
} 

function setTitleInst()
{
	if(!(typeof pgTitle === "undefined") && !(typeof GaMainTitleId === "undefined") && pgTitle!="")
	{
		GaMainTitleId.innerHTML=pgTitle;
	}
	if(!(typeof pgInstruction === "undefined") && !(typeof GaSubTitleId === "undefined") && pgInstruction !="" )
	{	
		GaSubTitleId.innerHTML=pgInstruction;
	}	
	if(!(typeof fltRegionColor === "undefined") && !(typeof FlyRange === "undefined") && fltRegionColor !="" )
	{	
		FlyRange.style.backgroundColor=fltRegionColor;
	}
	loadDynTopImg();	
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

