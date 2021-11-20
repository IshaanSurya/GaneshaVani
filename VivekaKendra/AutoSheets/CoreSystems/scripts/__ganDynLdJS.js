
function loadQs()
{
//dynFl.src="pocDynFl.js";
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "pocDynFl.js";
	s.innerHTML = null;
	s.id = "widget";
	// after dynamically loading js file,try accessing a var in it. 
	s.addEventListener("load",chgH); 
	headId.appendChild(s);
}

function chgH()
{
	h1Id.innerHTML += dynNm;
} 

