function getQCount()
{
	return answers.length;
}

function setErrorStyle(el)
{
	el.style.borderColor = "#FF0000";
	el.style.borderWidth="thick";
}

function checkValues(form) 
{
	//alert("I'm Ok");
	var score = 0;
	if(attempts <3)
	{
		for (var i=0; i<getQCount(); i++) 
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
	  	for (var i=0; i<getQCount(); i++) 
	  	{
	  		var val,tok="";
		   //	form.elements[i].style.borderColor="";
	   	  	for (j=0; j<numOptions;j++)
	  		{
		  		form.elements[i*4+j].style.borderColor= "#CC3300";
				if  (form.elements[i*4+j].checked)
				{
			  		if (form.elements[i*4+j].value == answers[i]) 
	   				{
						score = score+1;
					}
				  	else
				  	{
		  //form.elements[i*4+j].style.backgroundColor=;
		//form.elements[i*4+j].style.borderColor= "#FF0000";
					setErrorStyle(form.elements[i*4+j]);							
				  	}
				}
	    	}
	  	}
		attempts = attempts*1 + 1;
		//score = Math.round(score/getQCount()*100);
	}
	else
	{
	  DisableAll(form,"True")
	}
	form.percentage.value = score; //+ "%";
	form.questions.value = getQCount();
	form.attempts.value = attempts;  
}


function checkValuesEd(form) 
{

	var score = 0;
	for (var i=0; i<getQCount(); i++) 
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
  	for (var i=0; i<getQCount(); i++) 
	{
		//alert("FieldVal = " + form.elements[i].value , ",  Answer = " + answers[i]);
    		if (form.elements[i].value == answers[i]) 
		{
			score++;
     			form.elements[i].style.borderColor="";
      			//alert(answers[i])
    		}
    		else
    		{
	    		//form.elements[i].style.borderColor = "#FF0000";
	    		setErrorStyle(form.elements[i])
    		}
  	}

  	//score = Math.round(score/getQCount()*100);
  	form.percentage.value = score; //+ "%";
  	form.questions.value = getQCount();

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
	form.questions.value = getQCount();
}


function checkValuesMulWays(formElem,iC=false,iSp=false,iFilter=false) 
{
	var score = 0;
	var userAns=[];
	var form=[];
	// Extract user Answers into an array
	if(iFilter) //If filtering requested
	{
		//Filter to retain only flagged elements
		form=document.getElementsByName(gv_FilterAns);
	}
	else
	{
		// All form elements needs processing
		form=formElem.elements; 
	}
	for(var i=0;i<getQCount();i++)
	{
		//userAns[i]=form.elements[i].value;
		userAns[i]=form[i].value;
	}
	// If ignore spaces - remove spaces
	for(var i=0;iSp && i<userAns.length;i++)
	{
		userAns[i] = userAns[i].replace(/\s/g, '')
		answers[i]=answers[i].replace(/\s/g, '')
	}
	//if ignore case - convert into lowercase;
	for(var i=0;iC && i<userAns.length;i++)
	{
		userAns[i] = userAns[i].toLowerCase();
		answers[i]=answers[i].toLowerCase();
	}
	
	for (var i=0; i<userAns.length; i++) 
	{
		var idx = -1;
		var ans = answers[i];
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
				
			//alert("FieldVal = " + form.elements[i].value + ",  Answer = " + theAns+", "+form.elements[i].value.length+", "+theAns.length);
		    	if (userAns[i] == theAns) 
			{
					score++;
	     			//form.elements[i].style.borderColor="";
	     			form[i].style.borderColor="";
	      			found = 1;
	      			break;
	    		}
				ans = ans.substr(idx+1,ans.length);
		} while (idx !=-1);
		
  	  	if (found==0)
    		{
	    		//form.elements[i].style.borderColor="#FF0000";
	    		setErrorStyle(form[i]);
   		}
  	}

  	//score = Math.round(score/getQCount()*100);
  	formElem.percentage.value = score; //+ "%";
  	formElem.questions.value = getQCount();

	if(attempts >3)
	{
		DisableAll(form,"True")
	}
	else
	{
		attempts = attempts*1 + 1;
	}

	formElem.attempts.value = attempts;  
	formElem.percentage.value = score; //+ "%";
	formElem.questions.value = getQCount();
}

	
/*
function checkValuesMulWays(form) 
{
	var score = 0;
	for (var i=0; i<getQCount(); i++) 
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
  	for (var i=0; i<getQCount(); i++) 
	{
		var idx = -1;
		var ans = answers[i];
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
				
			//alert("FieldVal = " + form.elements[i].value + ",  Answer = " + theAns+", "+form.elements[i].value.length+", "+theAns.length);
		    	if (form.elements[i].value == theAns) 
			{
					score++;
	     			form.elements[i].style.borderColor="";
	      			found = 1;
	      			break;
	    		}
				ans = ans.substr(idx+1,ans.length);
		} while (idx !=-1);
		
  	  	if (found==0)
    		{
	    		form.elements[i].style.borderColor="#FF0000";
   		}
  	}

  	//score = Math.round(score/getQCount()*100);
  	form.percentage.value = score; //+ "%";
  	form.questions.value = getQCount();

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
	form.questions.value = getQCount();
}
*/
function checkPlaceValues(form) {
  //alert(form.id);
  var score = 0;
  var nRows=answers.length;
	for (var i=0; i<nRows*nCols; i++) 
	{
		var answer = form.elements[i].value;
		var answer_length = answer.length;
		var last_char = answer.charAt(answer_length-1);
		if (last_char == " ") 
		{
			form.elements[i].value = 0 ; 
		}
	}
	
	for (var i=0; i<nRows; i++) 
	{
		tempVal=0;
		for (j=0; j<nCols;j++)
		{
			tempVal = tempVal + form.elements[i*nCols+j].value*placVals[j];
		}
		studValues[i] = tempVal;
	}


 for (var i=0; i<nRows; i++) 
  {
	var correct = (studValues[i] == answers[i]);

		if(correct)
		{
			score++;
		}
		for (j=0; j<nCols;j++)
		{
		   	if (correct ) 
   			{	
   				form.elements[i*nCols+j].style.borderColor=""
   			}
   			else
   			{
	   			//form.elements[i*nCols+j].style.borderColor = "#FF0000";
	   			setErrorStyle(form.elements[i*nCols+j])
	   		}
	   	}
  }
	if(attempts <3)
	{
		attempts = attempts+1;
	}
	else
	{
	DisableAllPlaces(form,"True")
	}

  form.percentage.value = score; //+ "%";
  form.questions.value = getQCount();
  form.attempts.value = attempts;  
}

function checkValuesNoSpace(form) 
{

	var score = 0;
	/*for (var i=0; i<getQCount(); i++) 
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
	*/
  	for (var i=0; i<getQCount(); i++) 
	{
		var idx = -1;
		var ans = form.elements[i].value; //answer;
		more=1;
		
		var theAns="";
		do
		{
			idx = ans.search(/ /);
			if(idx != -1)
			{
				theAns = theAns+ans.substr(0,idx);
				ans = ans.substr(idx+1,ans.length);
				//alert(theAns);
			}
			else
			{
				theAns = theAns+ans;
				more=0;
			}
		}while (more);
				
		//alert("FieldVal = " + form.elements[i].value , ",  Answer = " + theAns);
		
	    	if (answers[i] == theAns) 
		{
			//alert(answers[i] + "   ,   " + theAns);
			score++;
     			form.elements[i].style.borderColor="";
      			found = 1;
    		}
    		else
    		{
	    		//form.elements[i].style.borderColor = "#FF0000";
	    		setErrorStyle(form.elements[i])
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
	form.questions.value = getQCount();
}

function checkValuesOnOperation(form) 
{

	var score = 0;
	var j=0;
  	for (var i=0; i<getQCount(); i++, j++) 
	{
		var idx = -1;
		//var ans = form.elements[i].value; //answer;
		more=1;
		
		var theAns=0;
		var val1, val2;
		
		val1 = form.elements[i].value;
		val2 = form.elements[++i].value;
				
		//alert("FieldVal = " + form.elements[i].value , ",  Answer = " + theAns);
		if(gOper == "*")
		{
			theAns = val1*val2;
		} 
		else if(gOper == "/")
		{
			theAns = val1/val2;
		} 
		else if(gOper == "+")
		{
			//alert(val1*1+val2*1);
			theAns = val1*1+val2*1;
		} 
		else if(gOper == "-")
		{
			theAns = val1-val2;
			//alert (gOper);
		} 
	    	if (answers[j] == theAns) 
		{
			score++;
     			form.elements[i].style.borderColor="";
     			form.elements[i-1].style.borderColor="";
      			//found = 1;
    		}
    		else
    		{
    			setErrorStyle(form.elements[i]);
    			setErrorStyle(form.elements[i-1]);
	    		//form.elements[i].style.borderColor = "#FF0000";
	    		//form.elements[i-1].style.borderColor = "#FF0000";
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
	form.questions.value = getQCount();
}
// This function displays the answer from the linked answer file in the "Answer Window"
function showAnswers(form)
{
	var val = prompt("This will disable the page. To continue please type, 'yes' and click OK");
	if(val != "yes")
	{
		return;
	}
	//checkValues(form);
	var correctAnswers = "";
	for (i=1; i<=getQCount(); i++) 
	{
		correctAnswers += i + ". " + answers[i-1] + "\r\n";
	}
	form.GradeMe.disabled = "True";
	DisableAll(form,"True")
	form.solutions.value = correctAnswers;
}


function resetAll(form) 
{
	var val = prompt("This will disable the page. To continue please type, 'yes' and click OK");
	if(val != null && val == "yes" )
	{
		form.reset;
		for (var i=0; i<getQCount(); i++) 
		{
			form.elements[i].style.borderColor="";
		}
	}
	return;
}


function DisableAll(form,bVal) 
{
	form.reset;
	for (var i=0; i<getQCount(); i++) 
	{
	form.elements[i].disabled = bVal;
	}
}


function hiliteme(form,me) 
{
	alert(me);
	if(prevBtn != "")
	{



		prevstyle = me.style;
		prevBtn.style.color = "#0000FF";
	}
	me.style.color = "#000000";
	prevBtn = me;

}


function checkValuesMulSel(form) 
{
	var score = 0;
	if(attempts <3)
	{
		for (var i=0; i<getQCount(); i++) 
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
		for (var i=0; i<getQCount(); i++) 
		{
			var val;
			var tok="";
			form.elements[i].style.borderColor="";
			
			for (var j=0; j<form.elements[i].length;j++)
			{
/*				alert(form.elements[i].options(j).selected);
				if  (form.elements[i].options(j).selected)
					val = "1";
				else
					val = "0";
				tok = tok + val; //answers[i,j] ;*/			
				if (form.elements[i].options[j].selected) 
					tok=tok+'1';
				else
					tok=tok+'0';
			}

			if (tok == answers[i]) 
			{
				score = score +1;
			}
			else
			{
				//form.elements[i].style.borderColor = "#FF0000";
				setErrorStyle(form.elements[i])
			}
		}
		attempts = attempts*1 + 1;
		//score = Math.round(score/getQCount()*100);
	}
	else
	{
		DisableAll(form,"True")
	}
	form.percentage.value = score; //+ "%";
	form.questions.value = getQCount();
	form.attempts.value = attempts;
}

// Dictation Functions                                                                           
function toWrdHldr(val,frm)                                                      
{                                                                                
	if(frm.wordHldr.value == null)                                           
	{                                                                        
		pval =  val;                                                     
	}                                                                        
	else                                                                     
	{                                                                        
		pval =  frm.wordHldr.value + val;                                
	}                                                                        
	frm.wordHldr.value = pval;                                               
}                                                                                
                                                                                 
function WordToList(frm)                                                         
{                                                                                
	if(frm.wordHldr.value != null)                                           
	{                                                                        
		frm.theList.value = frm.theList.value + frm.wordHldr.value + "\n"
		frm.wordHldr.value = "";                                         
	}                                                                        
}                                                                                
 
function toLocation(loc,frm)                                                         
{                                                                                
	if(frm.wordHldr.value != null)                                           
	{                                                                        
		loc.value = frm.wordHldr.value;
		frm.wordHldr.value = "";                                         
	}                                                                        
}

function checkMulSel(form) 
{
	if(attempts < 3)
	{
		var score = 0;
	for (var i=0; i<getQCount(); i++) 
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
  	for (var i=0; i<getQCount(); i++) 
	{
		var val,tok="";
	   	form.elements[i].style.borderColor="";
	  	for (j=0; j<numOptions;j++)
		{

			if  (form.elements[i].options(j).selected)
				val = 1;
			else
				val = 0;
			tok = tok + val; //answers[i,j] ;
	}
  		if (tok == answers[i]) 
		{
			score = score +1;
	   }
	  else
	  {
		  //form.elements[i].style.borderColor = "#FF0000";
		  setErrorStyle(form.elements[i])
  	  }
  }
		attempts = attempts*1 + 1
		//score = Math.round(score/getQCount()*100);
		form.percentage.value = score; //+ "%";
		form.questions.value = getQCount();
		form.attempts.value = attempts;		
	}
	else
	{
		DisableAll(form,"True")
	}
}



function loadKagunita(str,frm)
{
if(str == -1)
{
	enableKagButtons(true,frm);
	return;
}

	
var nKag = 32*16;
var Kag = new Array(nKag);
var i=0;
str = str*16;
 Kag[i++] = "P\EF"; Kag[i++] = "P\C0"; Kag[i++] = "P\C1"; Kag[i++] = "Q"; Kag[i++] = "Q\C3"; Kag[i++] = "P\C0\C4"; Kag[i++] = "P\C0\C6"; Kag[i++] = "P\C0\C8"; Kag[i++] = "P\C9"; Kag[i++] = "P\C9\C3"; Kag[i++] = "P\C9\CA"; Kag[i++] = "P\C9\C6"; Kag[i++] = "P\C9\C6\C3"; Kag[i++] = "P\CB"; Kag[i++] = "P\C0A"; Kag[i++] = "P\C0B";
 Kag[i++] = "S\EF"; Kag[i++] = "R"; Kag[i++] = "S\C1"; Kag[i++] = "T"; Kag[i++] = "T\C3"; Kag[i++] = "R\C4"; Kag[i++] = "R\C6"; Kag[i++] = "R\C8"; Kag[i++] = "S\C9"; Kag[i++] = "S\C9\C3"; Kag[i++] = "S\C9\CA"; Kag[i++] = "S\C9\C6"; Kag[i++] = "S\C9\C6\C3"; Kag[i++] = "S\CB"; Kag[i++] = "RA"; Kag[i++] = "RB";
 Kag[i++] = "U\EF"; Kag[i++] = "U\C0"; Kag[i++] = "U\C1"; Kag[i++] = "V"; Kag[i++] = "V\C3"; Kag[i++] = "U\C0\C4"; Kag[i++] = "U\C0\C6"; Kag[i++] = "U\C0\C8"; Kag[i++] = "U\C9"; Kag[i++] = "U\C9\C3"; Kag[i++] = "U\C9\CA"; Kag[i++] = "U\C9\C6"; Kag[i++] = "U\C9\C6\C3"; Kag[i++] = "U\CB"; Kag[i++] = "U\C0A"; Kag[i++] = "U\C0B";
 Kag[i++] = "W\EF"; Kag[i++] = "W\C0"; Kag[i++] = "W\C1"; Kag[i++] = "X"; Kag[i++] = "X\C3"; Kag[i++] = "W\C0\C4"; Kag[i++] = "W\C0\C6"; Kag[i++] = "W\C0\C8"; Kag[i++] = "W\C9"; Kag[i++] = "W\C9\C3"; Kag[i++] = "W\C9\CA"; Kag[i++] = "W\C9\C6"; Kag[i++] = "W\C9\C6\C3"; Kag[i++] = "W\CB"; Kag[i++] = "W\C0A"; Kag[i++] = "W\C0B";
 Kag[i++] = "Z\EF"; Kag[i++] = "Z\C0"; Kag[i++] = "Z\C1"; Kag[i++] = "a"; Kag[i++] = "a\C3"; Kag[i++] = "Z\C0\C4"; Kag[i++] = "Z\C0\C6"; Kag[i++] = "Z\C0\C8"; Kag[i++] = "Z\C9"; Kag[i++] = "Z\C9\C3"; Kag[i++] = "Z\C9\CA"; Kag[i++] = "Z\C9\C6"; Kag[i++] = "Z\C9\C6\C3"; Kag[i++] = "Z\CB"; Kag[i++] = "Z\C0A"; Kag[i++] = "Z\C0B";
 Kag[i++] = "b\EF"; Kag[i++] = "b\C0"; Kag[i++] = "b\C1"; Kag[i++] = "c"; Kag[i++] = "c\C3"; Kag[i++] = "b\C0\C4"; Kag[i++] = "b\C0\C6"; Kag[i++] = "b\C0\C8"; Kag[i++] = "b\C9"; Kag[i++] = "b\C9\C3"; Kag[i++] = "b\C9\CA"; Kag[i++] = "b\C9\C6"; Kag[i++] = "b\C9\C6\C3"; Kag[i++] = "b\CB"; Kag[i++] = "b\C0A"; Kag[i++] = "b\C0B";
 Kag[i++] = "e\EF"; Kag[i++] = "d"; Kag[i++] = "e\C1"; Kag[i++] = "f"; Kag[i++] = "f\C3"; Kag[i++] = "d\C4"; Kag[i++] = "d\C6"; Kag[i++] = "d\C8"; Kag[i++] = "e\C9"; Kag[i++] = "e\C9\C3"; Kag[i++] = "e\C9\CA"; Kag[i++] = "e\C9\C6"; Kag[i++] = "e\C9\C6\C3"; Kag[i++] = "e\CB"; Kag[i++] = "dA"; Kag[i++] = "dB";
 Kag[i++] = "m\EF"; Kag[i++] = "l"; Kag[i++] = "m\C1"; Kag[i++] = "n"; Kag[i++] = "n\C3"; Kag[i++] = "l\C4"; Kag[i++] = "l\C6"; Kag[i++] = "l\C8"; Kag[i++] = "m\C9"; Kag[i++] = "m\C9\C3"; Kag[i++] = "m\C9\CA"; Kag[i++] = "m\C9\C6"; Kag[i++] = "m\C9\C6\C3"; Kag[i++] = "m\CB"; Kag[i++] = "lA"; Kag[i++] = "lB";
 Kag[i++] = "o\EF"; Kag[i++] = "o\C0"; Kag[i++] = "o\C1"; Kag[i++] = "p"; Kag[i++] = "p\C3"; Kag[i++] = "o\C0\C4"; Kag[i++] = "o\C0\C6"; Kag[i++] = "o\C0\C8"; Kag[i++] = "o\C9"; Kag[i++] = "o\C9\C3";  Kag[i++] = "o\C9\CA"; Kag[i++] = "o\C9\C6"; Kag[i++] = "o\C9\C6\C3"; Kag[i++] = "o\CB"; Kag[i++] = "o\C0A"; Kag[i++] = "o\C0B";
 Kag[i++] = "q\EF"; Kag[i++] = "q\C0"; Kag[i++] = "q\C1"; Kag[i++] = "r"; Kag[i++] = "r\C3"; Kag[i++] = "q\C0\C4"; Kag[i++] = "q\C0\C6"; Kag[i++] = "q\C0\C8"; Kag[i++] = "q\C9"; Kag[i++] = "q\C9\C3"; Kag[i++] = "q\C9\CA"; Kag[i++] = "q\C9\C6"; Kag[i++] = "q\C9\C6\C3"; Kag[i++] = "q\CB"; Kag[i++] = "q\C0A"; Kag[i++] = "q\C0B";
 Kag[i++] = "qs\EF"; Kag[i++] = "qs\C0"; Kag[i++] = "qs\C1"; Kag[i++] = "r\FC"; Kag[i++] = "r\FC\C3"; Kag[i++] = "qs\C0\C4"; Kag[i++] = "qs\C0\C6"; Kag[i++] = "qs\C0\C8"; Kag[i++] = "qs\C9"; Kag[i++] = "qs\C9\C3"; Kag[i++] = "qs\C9\CA"; Kag[i++] = "qs\C9\C6"; Kag[i++] = "qs\C9\C6\C3"; Kag[i++] = "qs\CB"; Kag[i++] = "qs\C0A"; Kag[i++] = "qs\C0B";
 Kag[i++] = "u\EF"; Kag[i++] = "t"; Kag[i++] = "u\C1"; Kag[i++] = "t\C2"; Kag[i++] = "t\C2\C3"; Kag[i++] = "t\C4"; Kag[i++] = "t\C6"; Kag[i++] = "t\C8"; Kag[i++] = "u\C9"; Kag[i++] = "u\C9\C3"; Kag[i++] = "u\C9\CA"; Kag[i++] = "u\C9\C6"; Kag[i++] = "u\C9\C6\C3"; Kag[i++] = "u\CB"; Kag[i++] = "tA"; Kag[i++] = "tB";
 Kag[i++] = "v\EF"; Kag[i++] = "v\C0"; Kag[i++] = "v\C1"; Kag[i++] = "w"; Kag[i++] = "w\C3"; Kag[i++] = "v\C0\C4"; Kag[i++] = "v\C0\C6"; Kag[i++] = "v\C0\C8"; Kag[i++] = "v\C9"; Kag[i++] = "v\C9\C3"; Kag[i++] = "v\C9\CA"; Kag[i++] = "v\C9\C6"; Kag[i++] = "v\C9\C6\C3"; Kag[i++] = "v\CB"; Kag[i++] = "v\C0A"; Kag[i++] = "v\C0B";
 Kag[i++] = "x\EF"; Kag[i++] = "x\C0"; Kag[i++] = "x\C1"; Kag[i++] = "y"; Kag[i++] = "y\C3"; Kag[i++] = "x\C0\C4"; Kag[i++] = "x\C0\C6"; Kag[i++] = "x\C0\C8"; Kag[i++] = "x\C9"; Kag[i++] = "x\C9\C3"; Kag[i++] = "x\C9\CA"; Kag[i++] = "x\C9\C6"; Kag[i++] = "x\C9\C6\C3"; Kag[i++] = "x\CB"; Kag[i++] = "x\C0A"; Kag[i++] = "x\C0B";
 Kag[i++] = "z\EF"; Kag[i++] = "z\C0"; Kag[i++] = "z\C1"; Kag[i++] = "\A2"; Kag[i++] = "\A2\C3"; Kag[i++] = "z\C0\C4"; Kag[i++] = "z\C0\C6"; Kag[i++] = "z\C0\C8"; Kag[i++] = "z\C9"; Kag[i++] = "z\C9\C3"; Kag[i++] = "z\C9\CA"; Kag[i++] = "z\C9\C6"; Kag[i++] = "z\C9\C6\C3"; Kag[i++] = "z\CB"; Kag[i++] = "z\C0A"; Kag[i++] = "z\C0B";
 Kag[i++] = "zs\EF"; Kag[i++] = "zs\C0"; Kag[i++] = "zs\C1"; Kag[i++] = "\A2\FC"; Kag[i++] = "\A2\FC\C3"; Kag[i++] = "zs\C0\C4"; Kag[i++] = "zs\C0\C6"; Kag[i++] = "zs\C0\C8"; Kag[i++] = "zs\C9"; Kag[i++] = "zs\C9\C3"; Kag[i++] = "zs\C9\CA"; Kag[i++] = "zs\C9\C6"; Kag[i++] = "zs\C9\C6\C3"; Kag[i++] = "zs\CB"; Kag[i++] = "zs\C0A"; Kag[i++] = "zs\C0B";
 Kag[i++] = "\A3\EF"; Kag[i++] = "\A3\C0"; Kag[i++] = "\A3\C1"; Kag[i++] = "\A4"; Kag[i++] = "\A4\C3"; Kag[i++] = "\A3\C0\C4"; Kag[i++] = "\A3\C0\C6"; Kag[i++] = "\A3\C0\C8"; Kag[i++] = "\A3\C9"; Kag[i++] = "\A3\C9\C3"; Kag[i++] = "\A3\C9\CA"; Kag[i++] = "\A3\C9\C6"; Kag[i++] = "\A3\C9\C6\C3"; Kag[i++] = "\A3\CB"; Kag[i++] = "\A3\C0A"; Kag[i++] = "\A3\C0B";
 Kag[i++] = "\A5\EF"; Kag[i++] = "\A5\C0"; Kag[i++] = "\A5\C1"; Kag[i++] = "\A6"; Kag[i++] = "\A6\C3"; Kag[i++] = "\A5\C0\C5"; Kag[i++] = "\A5\C0\C7"; Kag[i++] = "\A5\C0\C8"; Kag[i++] = "\A5\C9"; Kag[i++] = "\A5\C9\C3"; Kag[i++] = "\A5\C9\CA"; Kag[i++] = "\A5\C9\C7"; Kag[i++] = "\A5\C9\C7\C3"; Kag[i++] = "\A5\CB"; Kag[i++] = "\A5\C0A"; Kag[i++] = "\A5\C0B";
 Kag[i++] = "\A5s\EF"; Kag[i++] = "\A5s\C0"; Kag[i++] = "\A5s\C1"; Kag[i++] = "\A6\FC"; Kag[i++] = "\A6\FC\C3"; Kag[i++] = "\A5s\C0\C5"; Kag[i++] = "\A5s\C0\C7"; Kag[i++] = "\A5s\C0\C8"; Kag[i++] = "\A5s\C9"; Kag[i++] = "\A5s\C9\C3"; Kag[i++] = "\A5s\C9\CA"; Kag[i++] = "\A5s\C9\C7"; Kag[i++] = "\A5s\C9\C7\C3"; Kag[i++] = "\A5s\CB"; Kag[i++] = "\A5s\C0A"; Kag[i++] = "\A5s\C0B";
 Kag[i++] = "\A8\EF"; Kag[i++] = "\A7"; Kag[i++] = "\A8\C1"; Kag[i++] = "\A9"; Kag[i++] = "\A9\C3"; Kag[i++] = "\A7\C4"; Kag[i++] = "\A7\C6"; Kag[i++] = "\A7\C8"; Kag[i++] = "\A8\C9"; Kag[i++] = "\A8\C9\C3"; Kag[i++] = "\A8\C9\CA"; Kag[i++] = "\A8\C9\C6"; Kag[i++] = "\A8\C9\C6\C3"; Kag[i++] = "\A8\CB"; Kag[i++] = "\A7A"; Kag[i++] = "\A7B";
 Kag[i++] = "\A8s\EF"; Kag[i++] = "\A8s\C0"; Kag[i++] = "\A8s\C1"; Kag[i++] = "\A9\FC"; Kag[i++] = "\A9\FC\C3"; Kag[i++] = "\A8s\C0\C4"; Kag[i++] = "\A8s\C0\C6"; Kag[i++] = "\A8s\C0\C8"; Kag[i++] = "\A8s\C9"; Kag[i++] = "\A8s\C9\C3"; Kag[i++] = "\A8s\C9\CA"; Kag[i++] = "\A8s\C9\C6"; Kag[i++] = "\A8s\C9\C6\C3"; Kag[i++] = "\A8s\CB"; Kag[i++] = "\A8s\C0A"; Kag[i++] = "\A8s\C0B";
 Kag[i++] = "\AA\C0i\EF"; Kag[i++] = "\AA\C0\C4"; Kag[i++] = "\AA\C0i\C1"; Kag[i++] = "\AB\C4"; Kag[i++] = "\AB\C4\C3"; Kag[i++] = "\AA\C0\C4\C4"; Kag[i++] = "\AA\C0\C4\C6"; Kag[i++] = "\AA\C0\C4\C8"; Kag[i++] = "\AA\C9\C4"; Kag[i++] = "\AA\C9\C4\C3"; Kag[i++] = "\AA\C9\C4\CA"; Kag[i++] = "\AA\C9\C6"; Kag[i++] = "\AA\C9\C6\C3"; Kag[i++] = "\AA\C0i\CB"; Kag[i++] = "\AA\C0\C4A"; Kag[i++] = "\AA\C0\C4B";
 Kag[i++] = "Ai\C0i\EF"; Kag[i++] = "Ai\C0\C4"; Kag[i++] = "Ai\C0i\C1"; Kag[i++] = "\AC\C4"; Kag[i++] = "\AC\C4\C3"; Kag[i++] = "Ai\C0\C4\C4"; Kag[i++] = "Ai\C0\C4\C6"; Kag[i++] = "Ai\C0\C4\C8"; Kag[i++] = "Ai\C9\C4"; Kag[i++] = "Ai\C9\C4\C3"; Kag[i++] = "Ai\C9\C4\CA"; Kag[i++] = "Ai\C9\C6"; Kag[i++] = "Ai\C9\C6\C3"; Kag[i++] = "Ai\C0i\CB"; Kag[i++] = "Ai\C0\C4A"; Kag[i++] = "Ai\C0\C4B";
 Kag[i++] = "g\EF"; Kag[i++] = "g\C0"; Kag[i++] = "g\C1"; Kag[i++] = "j"; Kag[i++] = "j\C3"; Kag[i++] = "g\C0\C4"; Kag[i++] = "g\C0\C6"; Kag[i++] = "g\C0\C8"; Kag[i++] = "g\C9"; Kag[i++] = "g\C9\C3"; Kag[i++] = "g\C9\CA"; Kag[i++] = "g\C9\C6"; Kag[i++] = "g\C9\C6\C3"; Kag[i++] = "g\CB"; Kag[i++] = "g\C0A"; Kag[i++] = "g\C0B";
 Kag[i++] = "\AF\EF"; Kag[i++] = "\AE"; Kag[i++] = "\AF\C1"; Kag[i++] = "\B0"; Kag[i++] = "\B0\C3"; Kag[i++] = "\AE\C4"; Kag[i++] = "\AE\C6"; Kag[i++] = "\AE\C8"; Kag[i++] = "\AF\C9"; Kag[i++] = "\AF\C9\C3"; Kag[i++] = "\AF\C9\CA"; Kag[i++] = "\AF\C9\C6"; Kag[i++] = "\AF\C9\C6\C3"; Kag[i++] = "\AF\CB"; Kag[i++] = "\AEA"; Kag[i++] = "\AEB";
 Kag[i++] = "\AA\EF"; Kag[i++] = "\AA\C0"; Kag[i++] = "\AA\C1"; Kag[i++] = "\AB"; Kag[i++] = "\AB\C3"; Kag[i++] = "\AA\C0\C5"; Kag[i++] = "\AA\C0\C7"; Kag[i++] = "\AA\C0\C8"; Kag[i++] = "\AA\C9"; Kag[i++] = "\AA\C9\C3"; Kag[i++] = "\AA\C9\CA"; Kag[i++] = "\AA\C9\C7"; Kag[i++] = "\AA\C9\C7\C3"; Kag[i++] = "\AA\CB"; Kag[i++] = "\AA\C0A"; Kag[i++] = "\AA\C0B";
Kag[i++] = "\B1\EF"; Kag[i++] = "\B1\C0"; Kag[i++] = "\B1\C1"; Kag[i++] = "\B2"; Kag[i++] = "\B2\C3"; Kag[i++] = "\B1\C0\C4"; Kag[i++] = "\B1\C0\C6"; Kag[i++] = "\B1\C0\C8"; Kag[i++] = "\B1\C9"; Kag[i++] = "\B1\C9\C3"; Kag[i++] = "\B1\C9\CA"; Kag[i++] = "\B1\C9\C6"; Kag[i++] = "\B1\C9\C6\C3"; Kag[i++] = "\B1\CB"; Kag[i++] = "\B1\C0A"; Kag[i++] = "\B1\C0B";
Kag[i++] = "\B5\EF"; Kag[i++] = "\B5\C0"; Kag[i++] = "\B5\C1"; Kag[i++] = ""; Kag[i++] = "\C3"; Kag[i++] = "\B5\C0\C4"; Kag[i++] = "\B5\C0\C6"; Kag[i++] = "\B5\C0\C8"; Kag[i++] = "\B5\C9"; Kag[i++] = "\B5\C9\C3"; Kag[i++] = "\B5\C9\CA"; Kag[i++] = "\B5\C9\C6"; Kag[i++] = "\B5\C9\C6\C3"; Kag[i++] = "\B5\CB"; Kag[i++] = "\B5\C0A"; Kag[i++] = "\B5\C0B";
Kag[i++] = "\B8\EF"; Kag[i++] = "\B8\C0"; Kag[i++] = "\B8\C1"; Kag[i++] = "\B9"; Kag[i++] = "\B9\C3"; Kag[i++] = "\B8\C0\C4"; Kag[i++] = "\B8\C0\C6"; Kag[i++] = "\B8\C0\C8"; Kag[i++] = "\B8\C9"; Kag[i++] = "\B8\C9\C3"; Kag[i++] = "\B8\C9\CA"; Kag[i++] = "\B8\C9\C6"; Kag[i++] = "\B8\C9\C6\C3"; Kag[i++] = "\B8\CB"; Kag[i++] = "\B8\C0A"; Kag[i++] = "\B8\C0B";
Kag[i++] = "\BA\EF"; Kag[i++] = "\BA\C0"; Kag[i++] = "\BA\C1"; Kag[i++] = "\BB"; Kag[i++] = "\BB\C3"; Kag[i++] = "\BA\C0\C4"; Kag[i++] = "\BA\C0\C6"; Kag[i++] = "\BA\C0\C8"; Kag[i++] = "\BA\C9"; Kag[i++] = "\BA\C9\C3"; Kag[i++] = "\BA\C9\CA"; Kag[i++] = "\BA\C9\C6"; Kag[i++] = "\BA\C9\C6\C3"; Kag[i++] = "\BA\CB"; Kag[i++] = "\BA\C0A"; Kag[i++] = "\BA\C0B";
Kag[i++] = "\BC\EF"; Kag[i++] = "\BC\C0";Kag[i++] =  "\BC\C1"; Kag[i++] = "\BD"; Kag[i++] = "\BD\C3"; Kag[i++] = "\BC\C0\C4"; Kag[i++] = "\BC\C0\C6"; Kag[i++] = "\BC\C0\C8"; Kag[i++] = "\BC\C9"; Kag[i++] = "\BC\C9\C3"; Kag[i++] = "\BC\C9\CA"; Kag[i++] = "\BC\C9\C6"; Kag[i++] = "\BC\C9\C6\C3"; Kag[i++] = "\BC\CB"; Kag[i++] = "\BC\C0A"; Kag[i++] = "\BC\C0B";
Kag[i++] = "P\EF\EB"; Kag[i++] = "P\C0\EB"; Kag[i++] = "P\C1\EB"; Kag[i++] = "Q\EB"; Kag[i++] = "Q\EB\C3"; Kag[i++] = "P\C0\C4\EB"; Kag[i++] = "P\C0\C6\EB"; Kag[i++] = "P\C0\EB\F6\C8"; Kag[i++] = "P\C9\EB"; Kag[i++] = "P\C9\EB\C3"; Kag[i++] = "P\C9\EB\F6\CA"; Kag[i++] = "P\C9\C6\EB"; Kag[i++] = "P\C9\C6\EB\C3"; Kag[i++] = "P\CB\EB"; Kag[i++] = "P\C0\EBA"; Kag[i++] = "P\C0\EBB";


	enableKagButtons(false,frm);
	//alert(str);
	frm.k0.value=Kag[str++];
	frm.k1.value=Kag[str++];
	frm.k2.value=Kag[str++];
	frm.k3.value=Kag[str++];
	frm.k4.value=Kag[str++];
	frm.k5.value=Kag[str++];
	frm.k6.value=Kag[str++];
	frm.k7.value=Kag[str++];
	frm.k8.value=Kag[str++];
	frm.k9.value=Kag[str++];
	frm.k10.value=Kag[str++];
	frm.k11.value=Kag[str++];
	frm.k12.value=Kag[str++];
	frm.k13.value=Kag[str++];
	frm.k14.value=Kag[str++];
	frm.k15.value=Kag[str++];
}

function enableKagButtons(enb,frm)
{
	frm.k0.disabled=enb;
	frm.k1.disabled=enb;
	frm.k2.disabled=enb;
	frm.k3.disabled=enb;
	frm.k4.disabled=enb;
	frm.k5.disabled=enb;
	frm.k6.disabled=enb;
	frm.k7.disabled=enb;
	frm.k8.disabled=enb;
	frm.k9.disabled=enb;
	frm.k10.disabled=enb;
	frm.k11.disabled=enb;
	frm.k12.disabled=enb;
	frm.k13.disabled=enb;
	frm.k14.disabled=enb;
	frm.k15.disabled=enb;
}                                                                                


/*
function toPower(e,ed)
{
	var keyNum;
	var keyChar;
	var pwr;
	var evtobj=window.event? window.event : e
	if(evtobj.ctrlKey)// && evtobj.altKey)
	{
    		
    		if(window.event) // IE
			{
			keynum = e.keyCode;
			}
		else if(e.which) // Netscape/Firefox/Opera
			{
			keynum = e.which;
			}
		keynum = e.which;
		keychar = String.fromCharCode(keynum);
		pwr = String.fromCharCode(power[Number(keychar)]);

		// ----------	Specific handling for + and - superscripts	- Revisit this logic
		if (Number(keynum) == 61 || Number(keynum) == 45) // if - or = clicked.
		{
			pwr = (Number(keynum) == 61) ? String.fromCharCode(power[11]) : String.fromCharCode(power[10]);
		}
		// --------------------------

		var s = getSelectionStart(ed);
		var orgval = ed.value;
		var bfr = orgval.substring(0,s);
		var aft = orgval.substring(s,orgval.length);
		//alert(bfr + " <>" + aft);
		ed.value = bfr + pwr + aft;
		//alert(pwr+", "+ keychar);	
		evtobj.stopPropagation ();
		evtobj.preventDefault ();

	}
	//alert (pwr);

	return pwr; //String.fromCharCode(power[Number(keychar)]);
}
*/

// Raising to Power
var power = new Array(12);
power[0] = 176 //0
power[1] = 185	//1
power[2] = 178	//2
power[3] = 179	//3
power[4] = 8308	//4
power[5] =8309	//5
power[6] = 8310	//6
power[7] = 8311	//7
power[8] = 8312	//8
power[9] = 8313	//9

var spChar=[];
spChar["-"] = 8315 //"-"
spChar["+"] = 8314 //"+"
spChar["s"] = 8730 //"√"
spChar["c"] = 8731 //"∛"
spChar["q"] = 8732 //"∜"
spChar["a"] = 8736 //"∠"
spChar["o"] = 8486 //"Ω"
spChar["f"] = 8734 //"∞"
function toPower (zEvent,ed) {
    var keyStr = ["Control", "Shift", "Alt", "Meta"].includes(zEvent.key) ? "" : zEvent.key + " ";
    var pwrStr='1234567890-+scqaof';
   /* var reportStr   =
        "The " +
        ( zEvent.ctrlKey  ? "Control " : "" ) +
        ( zEvent.shiftKey ? "Shift "   : "" ) +
        ( zEvent.altKey   ? "Alt "     : "" ) +
        ( zEvent.metaKey  ? "Meta "    : "" ) +
        keyStr + "key was pressed."
    ;
    statusReport.innerHTML=reportStr;
	*/
    //--- Was a Ctrl-Alt-E combo pressed?
    if (zEvent.ctrlKey  &&  zEvent.altKey  &&  pwrStr.includes(zEvent.key,0)) 	{  // case sensitive
    var exChar = (isNaN(zEvent.key)) ? spChar[zEvent.key] : power[Number(zEvent.key)];
    alert(exChar);
        	var suPwr= String.fromCharCode(exChar);//power[Number(zEvent.key)]);
        	ed.value=ed.value+ suPwr;//'<sup>'+zEvent.key+'</sup>';    		
        	zEvent.stopPropagation ();
    		zEvent.preventDefault ()
    }
return zEvent.key;
}

// Gets the caret position in an input text ctrl
function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}

// Function to load Frame Image Pages Dynamically
function loadDynPg()
{
	var genImg = document.getElementById("genImg");
	var imgSrc =  Request.QueryString("imgSrc");
	var w =  Request.QueryString("wt");	
	var h =  Request.QueryString("ht");
	genImg.src = imgSrc;
	genImg.width = parseInt(w);
	genImg.height = parseInt(h);
//	alert(genImg.src + w + h);
}

// Function to load Floater Pages Dynamically
function loadFloaterDynPg()
{
	var genImg = document.getElementById("RandomRange");
	if(g_bkClr==undefined || g_bkClr==null)
		genImg.style.backgroundColor="#FFCC80"; //g_bkClr;
	var imgSrc =  Request.QueryString("ansFile");
	var ans = document.getElementById("ansId")
	if(ans==undefined || ans==null)
	{
		alert("Cannot proceed, cannot link answers");
		return;
	}
	ans.src=ansFiles[Number(imgSrc)];
}
