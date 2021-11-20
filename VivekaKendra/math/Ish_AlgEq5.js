<!--
var numQues = 12;
var numOptions = 04;
var answers = [];
var sel = new Array(numQues);
var attempts =0;

var dynOptionIP=[];
var d_x=0;
      
      dynOptionIP[d_x++]=["`H-D/5=WH`","-1"];// solve D
      dynOptionIP[d_x++]=["`H-D=5WH`","0"];
      dynOptionIP[d_x++]=["`H/5=WH+D`","0"];
      dynOptionIP[d_x++]=["`-D/5=WH-H`","1"];//1
      dynOptionIP[d_x++]=["`-D/5=WH+H`","0"];    
      dynOptionIP[d_x++]=["`D=-5(WH-H)`","2"]; //2

      
      dynOptionIP[d_x++]=["`(W+TD)/H=S`","-1"];//solve for D
      dynOptionIP[d_x++]=["`(TD)/H=S-W`","0"];
      dynOptionIP[d_x++]=["`W+TD=SH`","1"];//1
      dynOptionIP[d_x++]=["`TD=SH-W`","2"];//2    
      dynOptionIP[d_x++]=["`T=SH/T-W`","0"];  
      dynOptionIP[d_x++]=["`T=(SH-W)/D`","3"]; //3 
      
      
      dynOptionIP[d_x++]=["`(W-T)/3=S-H`","-1"];//solve for W
      dynOptionIP[d_x++]=["`(-T)/3=S-H-W`","0"];
      dynOptionIP[d_x++]=["`W-T=3S-H`","0"];
      dynOptionIP[d_x++]=["`W-T=3(S-H)`","1"];    
      dynOptionIP[d_x++]=["`W=3(S-H)+T`","2"];   
      dynOptionIP[d_x++]=["`W=3T(S-H)`","0"]; 
      
      dynOptionIP[d_x++]=["`S=(WH)/T - D`","-1"];// solve for T
      dynOptionIP[d_x++]=["`S+D=(WH)/T`","1"];
      dynOptionIP[d_x++]=["`TS+D=WH`","0"];    
      dynOptionIP[d_x++]=["`T(S+D)=WH`","2"];  
      dynOptionIP[d_x++]=["`T=WH-(S+D)`","0"];  
      dynOptionIP[d_x++]=["`T=(WH)/(S+D)`","3"]; 


var i_x=0;

answers[i_x++] = "12";
answers[i_x++] = "000";
answers[i_x++] = "123";
answers[i_x++] = "00";
answers[i_x++] = "12";
answers[i_x++] = "000";
answers[i_x++] = "123";
answers[i_x++] = "00";

-->
