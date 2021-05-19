function tmToStr(tzObj)
{
	//alert(tzObj.hh + ":" + tzObj.mm + ":" + tzObj.ampm);
	return (tzObj.hh + ":" + tzObj.mm + ":" + tzObj.ampm);
}

function strToTime(tm)
{
	var tmObj = new Object();
	var idx = tm.search(/:/);
	if(idx != -1)
	{
		tmObj.hh = Number(tm.substr(0,idx));
	}
	tm = tm.substr(idx+1,tm.length);
	idx = tm.search(/:/);
	//alert(tm+","+idx);
	if(idx != -1)
	{
		tmObj.mm = Number(tm.substr(0,idx));
	}
	tmObj.ampm = tm.substr(idx+1,tm.length);
	//alert(tmObj.hh + ":" + tmObj.mm + "." + tmObj.ampm);
	return tmObj;
}

function millTmDiff(gmt,diffTm)
{
	var gmtObj = strToTime(gmt);
	var diffObj = strToTime(diffTm);
	var gmtDt = new Date(2000,0,1,gmtObj.hh, gmtObj.mm, 0,0);
	var gmtInMill = gmtDt.getTime();	// GMT Time in milliseconds Since midnight 1970
	var diffInMill = ((diffObj.hh*60)+(diffObj.mm*1))*60*1000;	// Time difference in milliseconds
	var diffDt = new Date(gmtInMill+diffInMill);	// Convert this to Date
	var hr12 = diffDt.getHours();	// Extract the Hr part of the Date
	var q = parseInt(hr12*1/12);	// See if the quotient. 
	//alert(q);
	var ampm;
	if(q>0)	// If the quotient is greater than 0 that means adding the time difference will cause time to shift the meridian.
	{
		ampm = (gmtObj.ampm=="am"?"pm":"am") ;	//Shift the maridian from what is specified in GMT
	}
	else
	{
		ampm = gmtObj.ampm;		// Keep the Maridian as specified in GMT
	}
	hr12 = hr12*1 - q*12;
	hr12 = (hr12==0) ? 12 : hr12;
	return (hr12+ ":" + diffDt.getMinutes() + ":" + ampm);
}

function checkLocalTime(form)
{	
	var score = 1;
	for (i=1; i<numQues; i++) 
	{
		var answer = form.elements[i].value;
		var answer_length = answer.length;
		var last_char = answer.charAt(answer_length-1);
		if (last_char == " ") 
		{
			form.elements[i].value = (answer.substring(0, answer_length-1)) ; 
    			i=i-1;
		}
	}
  	for (i=1; i<numQues; i++) 
	{
		var locTm = millTmDiff(form.elements[0].value, answers[i]);
		var objTm = strToTime(form.elements[i].value);	// Converts ans to date format to eleminate leading zeros
		var ansTm = tmToStr(objTm); // Convert it back to string for comparison.
		//alert( ansTm + " --> " +  locTm);
    		if (ansTm == locTm)
		{
			score++;
     			form.elements[i].style.backgroundColor="";
      			//alert(answers[i])
    		}
    		else
    		{
	    		form.elements[i].style.backgroundColor="#C0C0C0";
    		}
  	}

  	//score = Math.round(score/numQues*100);
  	form.percentage.value = score; //+ "%";
  	form.questions.value = numQues;

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


	

