var templMatch="<ganDynFloat>";  //This Has to be the 1st line. This Matches the Template
var taskLinkNm="<Statement Problem1 7th grades>" // provide a name for this task sheet - to be displayed in the launch sheet
var subTopicNm="<Addition>";
var pgTitle="Java Syntax"
var pgInstruction="Start the game and choose all possible corrent answers.";
var fltRegionColor="#FFA0FF"
var g_fltTopImg="../../../imgKendra/Land2.png";

var nAnsOpt = 8;
var l_rtAns = 2;
var l_wrAns = -1;
var l_movTime = 100; //  // Limit (30 fastest : 300 slowest) 

var ansOptList = new Array(4);
var qList = new Array(4);
var ansList = new Array(4);
var myMin=1;

var qii=0;
var aii=0;
qList[qii++] = ["I left my bag ____ the desk."];	ansOptList[aii++] = ["@near", "@under", "in", "over", "good", "go", "take", "make" ];	
qList[qii++] =  ["The dog is sleeping ____ the kennel."];	ansOptList[aii++] = ["@in", "@behind", "@near", "over", "first", "wake", "bone", "bark"];
qList[qii++] = ["My school is _____ our house."];	ansOptList[aii++] = ["@near","@behind","forest","@in front of", "stadium", "park", "playground", "@across" ];
qList[qii++] = ["My brother is ____ then me."];	ansOptList[aii++] = ["@taller","tall","good","@smarter", "fastest", "8th grade", "@shorter", "@fatter" ];

