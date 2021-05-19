var nAnsOpt = 8;

var ansOptList = new Array(5);
var qList = new Array(5);
var ansList = new Array(5);
var myMin = 2;

qList[0] = ["half"];	ansOptList[0] = ["5/6", "@4/8", "@3/6", "1/3", "4/5", "7/6", "@5/10" ];	
qList[1] =  ["Pick pronouns. "];	ansOptList[1] = ["@his", "ball", "@my", "@me", "@her", "girl", "there", "@their"];
qList[2] = ["Pick prepositions."];	ansOptList[2] = ["@on","he","@under","@above", "all", "come", "@behind", "stand" ];
qList[3] =	["Pick nouns."];	ansOptList[3] = ["take","go", "@question", "find", "small", "@door", "green", "fast" ];
qList[4] =	["Pick adjectives"];	ansOptList[4] = ["@tall", "@fat", "brother", "@wooden", "@dirty", "@red", "@neat", "bark" ];
qList[5] =	["Pick articles"];	ansOptList[5] = ["@the", "fat", "brother", "@a", "dirty", "red", "neat", "@an" ];
var l_rtAns = 5;
var l_wrAns = -5;
var l_movTime = 70; // Limit (10 fastest - 200 slowest) 
