var nAnsOpt = 6;

//var ansOpt1 = [1, 4, 46, 73, 13, 25, 83, 250 ];
//var ansOpt2 = [2398, 3654, 1003, 7609, 5431, 9860, 8131, 2097];

var ansOptList = new Array(3);
var qList = new Array(3);
var ansList = new Array(3) 
var myMin = 5;	// Timer - in minutes
var l_movTime = 170;  // Limit (10 fastest - 200 slowest)


qList[0] = ["1. ##,4##."];	ansOptList[0] = ["one thousand five hundred and ten", "five thousand two hundred and three.", "@two thousand four hundred and ninty.", "@ninety one thousand four hundred and six.", "@sixty eight thousand four hundred and twelve.", "@Seven thousand four hundred and thirty two."];	

qList[1] = ["2. ##,9#0."];	ansOptList[1] = ["two thousand six hundred and ten", "five thousand two hundred and three.", "@two thousand nine hundred and ten.", "@forty one thousand and nine hundred.", "sixty one thousand two hundred and twelve.", "@Seven thousand nine hundred and thirty."];	

qList[2] = ["3. 0#,###."];	ansOptList[2] = ["@one thousand five hundred and ten", "@five thousand two hundred and three.", "@two thousand four hundred and ninty.", "ninety one thousand four hundred and six.", "sixty eight thousand four hundred and twelve.", "@Seven thousand four hundred and thirty two."];	

qList[3] = ["4. ##,00#."];	ansOptList[3] = ["one thousand five hundred and ten", "five thousand two hundred and three.", "@two thousand four.", "@ninety one thousand and one.", "sixty eight thousand twelve.", "@Seven thousand and two."];	

qList[4] = ["5. #0,#0#."];	ansOptList[4] = ["twelve thousand five hundred and ten", "five thousand two hundred and three.", "@twenty thousand four hundred and seven.", "@ninety thousand four hundred and six.", "sixty eight thousand four hundred and twelve.", "four hundred and two."];	
	
var g_rtAns = 5;
var g_wrAns = -5;

