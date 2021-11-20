var templMatch="<ganRandom>";  //This Has to be the 2nd line. This Matches the Template automatically;
var taskLinkNm="Statement Problem1 7th grades" // provide a name for this task sheet - to be displayed in the launch sheet
var subTopicNm="Addition";
//var numQues = 7;	// Number of questions
var maxQuestions = 7;	// Maximum number of Qs to pose. cannot be more than numQues.

var myMin = 5;	// Timer - in minutes
var pgTitle="Math Example Sheet"
var pgInstruction="Read the questions carefully and fill in the blanks.";
var ignoreSpaces=true;
var ignoreCase=true;
var fltRegionColor="#989478"
var g_fltTopImg="../../../imgKendra/Land2.png";

var answers = [];
var sel = [];
var attempts =0;

var question=[];
var qii=0;
var aii=0;

question[qii++]="### are all the factor of 12.";
answers[aii++]="1,2,3,4,6,12";

question[qii++]="### If A = {1,3,2,7} then ### is the subset containing even numbers.";
answers[aii++]="{2}";

question[qii++]="The even numbers (in order) between 9 and 15 ###.";   
answers[aii++]="10,12,14"; 

question[qii++]="If ABCD is a quadrilateral then its diagonals (in order)  are ### .";
answers[aii++]="AC, BD;BD, AC";

question[qii++]="Each internal angle of an equilateral triangle is ### °";
answers[aii++]="60";

question[qii++]="5b+b+2b=###"; 
answers[aii++]="8b;b8";

question[qii++]="### is the square of 35.";
answers[aii++]="1225";

question[qii++]="ABC is an isosceles triangle and angle ABC = 100. Each of the remaining angles is ### °.";
answers[aii++]="40";

question[qii++]="Perimeter of a square is 48 cm. Each side is ### cm.  ";
answers[aii++]="12";

question[qii++]="A ### is a specilized rectangle.";
answers[aii++]="square";

question[qii++]="If diagonals of a quadrilateral are of equal length, then the quadrilateral is a ###. ";
answers[aii++]="square, rectangle; square and rectangle; rectangle and square";
   


<!--

// -------- Congratulating images-----
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
var congkMsg = new Array(5);
congkMsg[0]="";	//100 %
congkMsg[1]="";	//80%
congkMsg[2]="";	//60%
congkMsg[3]="";	//40%
congkMsg[4]="";	//30%
var congLang= "E"; //K; //E; //EK;
-->
