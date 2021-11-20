/*
ASCIIMathMLeditor.js
====================
This file contains JavaScript functions that work with ASCIIMathML.js 
to allow editing of ASCII math notation and conversion to a XHTML+MathML
page. This is a convenient and inexpensive solution for authoring MathML.

Version 2.01 March 1, 2009, (c) Peter Jipsen http://www.chapman.edu/~jipsen
Latest version at http://www.chapman.edu/~jipsen/mathml/ASCIIMathMLeditor.js
If you use it on a webpage, please send the URL to jipsen@chapman.edu

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License (at http://www.gnu.org/copyleft/gpl.html) 
for more details.
*/

var AMkeyspressed = 20;
/*

// This should be called on body's onload event  .... onload="initEditor()"

function initEditor() {
  AMinitSymbols();
  var body = document.getElementsByTagName("body")[0];
  if (checkForMathML) {
    checkForMathML = false;
    var nd = AMisMathMLavailable();
    if (nd != null) body.insertBefore(nd,body.childNodes[0]);
  }
  AMdisplay(true);
}
*/
/*
function AMnode2string(inNode,indent) {
// thanks to James Frazer for contributing an initial version of this function
   var i, str = "";
   if(inNode.nodeType == 1) {
       var name = inNode.nodeName.toLowerCase(); // (IE fix)
       str = "\r" + indent + "<" + name;
       for(i=0; i < inNode.attributes.length; i++)
           if (inNode.attributes[i].nodeValue!="italic" &&
               inNode.attributes[i].nodeValue!="" &&  //stop junk attributes
               inNode.attributes[i].nodeValue!="inherit" && // (mostly IE)
               inNode.attributes[i].nodeValue!=undefined)
               str += " "+inNode.attributes[i].nodeName+"="+
                     "\""+inNode.attributes[i].nodeValue+"\"";
       if (name == "math") 
           str += " xmlns=\"http://www.w3.org/1998/Math/MathML\"";
       str += ">";
       for(i=0; i<inNode.childNodes.length; i++)
           str += AMnode2string(inNode.childNodes[i], indent+"  ");
       if (name != "mo" && name != "mi" && name != "mn") str += "\r"+indent;
       str += "</" + name + ">";
   }
   else if(inNode.nodeType == 3) {
       var st = inNode.nodeValue;
       for (i=0; i<st.length; i++)
           if (st.charCodeAt(i)<32 || st.charCodeAt(i)>126)
               str += "&#"+st.charCodeAt(i)+";";
           else if (st.charAt(i)=="<" && indent != "  ") str += "&lt;";
           else if (st.charAt(i)==">" && indent != "  ") str += "&gt;";
           else if (st.charAt(i)=="&" && indent != "  ") str += "&amp;";
           else str += st.charAt(i);
   }
   return str;
} 
*/

function g_postLoadInit()
{
      /*var dynOptionIP = [];
      dynOptionIP[0]="An Integral `int_-1^3 sqrt(1-x^2)dx = pi/2`";
      dynOptionIP[1]="A Matrix `((a,b),(c,d))^-1 = 1/(ad-bc)((d,-b),(-c,a))`";
     return dynOptionIP; 
     */
     AMdisplayIsh(true,dynOptionIP);
}
function AMdisplayIsh(now,str) {
//  if (document.getElementById("inputText") != null) 
  {
    if (AMkeyspressed == 20 || now) {
    	
      /*var str = [];
      str[0]="An Integral `int_-1^3 sqrt(1-x^2)dx = pi/2`";
      str[1]="A Matrix `((a,b),(c,d))^-1 = 1/(ad-bc)((d,-b),(-c,a))`"/
      /document.getElementById("inputText").value;
      */
     var DynMLAry = document.getElementsByName("DynH");   //document.getElementById("outputNode");
      //var newnode = AMcreateElementXHTML("div");
      //var newFrag = document.createDocumentFragment();
      //newnode.setAttribute("id","outputNode");
      //outnode.parentNode.replaceChild(newnode,outnode);
      //outnode = document.getElementById("outputNode");
    
      for(var j=0;j<str.length;j++)
      {
      var outnode=DynMLAry[j];
      var arr = str[j][0].split((isIE?"\r\n\r\n":"\n\n"));
      outnode.value=str[j][1];
      outnode.innerHTML="";
      for (var i = 0; i<arr.length; i++){
      outnode.innerHTML+=arr[i]+"``";
        //outnode.appendChild(document.createTextNode(arr[i]+"``"));
        //var spn = AMcreateElementXHTML("p");
        //outnode.appendChild(spn);
      }
     
      if (!isIE) LMprocessNode(outnode,true);
      AMprocessNode(outnode,true);
      if (isIE) LMprocessNode(outnode,true);
      AMkeyspressed = 0;
      /* 
        var DynML=document.getElementsByClassName("DynH");    
       if (!isIE) LMprocessNode(DynML[0],true);
      AMprocessNode(DynML[0],true);
      if (isIE) LMprocessNode(DynML[0],true);
      AMkeyspressed = 0;
      */
 	}
    } else AMkeyspressed++;
  }
}




function AMdisplay(now) {
//  if (document.getElementById("inputText") != null) 
  {
    if (AMkeyspressed == 20 || now) {
      var str = "`int_-1^3 sqrt(1-x^2)dx = pi/2`,  `((a,b),(c,d))^-1 = 1/(ad-bc)((d,-b),(-c,a))`"//document.getElementById("inputText").value;
     var outnode = document.getElementsByClassName("DynH")[0];   //document.getElementById("outputNode");
      //var newnode = AMcreateElementXHTML("div");
      //var newFrag = document.createDocumentFragment();
      //newnode.setAttribute("id","outputNode");
      //outnode.parentNode.replaceChild(newnode,outnode);
      //outnode = document.getElementById("outputNode");
      var arr = str.split((isIE?"\r\n\r\n":"\n\n"));
      for (var i = 0; i<arr.length; i++){
      outnode.innerHTML+=arr[i]+"``";
        //outnode.appendChild(document.createTextNode(arr[i]+"``"));
        //var spn = AMcreateElementXHTML("p");
        //outnode.appendChild(spn);
      }
      
      if (!isIE) LMprocessNode(outnode,true);
      AMprocessNode(outnode,true);
      if (isIE) LMprocessNode(outnode,true);
      AMkeyspressed = 0;
      /* 
        var DynML=document.getElementsByClassName("DynH");    
       if (!isIE) LMprocessNode(DynML[0],true);
      AMprocessNode(DynML[0],true);
      if (isIE) LMprocessNode(DynML[0],true);
      AMkeyspressed = 0;
      */

    } else AMkeyspressed++;
  }
}

function AMchangeColumns(n) {
  var node = document.getElementById("inputText");
  node.setAttribute("cols",n);
}

doubleblankmathdelimiter = true;

function AMsetDoubleBlank() {
  doubleblankmathdelimiter = 
    document.getElementById("doubleblank").checked;
}

/*function AMviewMathML() {
  AMdisplay(true);
  var str = document.getElementById("inputText").value;
  var outnode = document.getElementById("outputNode");
  var outstr = AMnode2string(outnode,"").slice(22).slice(0,-6);
  outstr = '<?xml version="1.0"?>\r\<!-- Copy of ASCIIMathML input\r'+str+
'-->\r<?xml-stylesheet type="text/xsl" href="http://www1.chapman.edu/~jipsen/mathml/pmathml.xsl"?>\r\
<html xmlns="http://www.w3.org/1999/xhtml"\r\
  xmlns:mml="http://www.w3.org/1998/Math/MathML">\r\
<head>\r<title>...</title>\r</head>\r<body>\r'+
outstr+'<\/body>\r<\/html>\r';
  var newnode = AMcreateElementXHTML("textarea");
  newnode.setAttribute("id","outputNode");
  newnode.setAttribute("rows","30");
  var node = document.getElementById("inputText");
  newnode.setAttribute("cols",node.getAttribute("cols"));
  newnode.appendChild(document.createTextNode(outstr));
  outnode.parentNode.replaceChild(newnode,outnode);
}

// had to redefine the following ASCIIMathML.js function since
// two lines in it need to be commented out 

function LMprocessNode(n, linebreaks, spanclassLM) {
  var frag,st;
  if (spanclassLM!=null) {
    frag = document.getElementsByTagName("span")
    for (var i=0;i<frag.length;i++)
      if (frag[i].className == "LM")
        LMprocessNodeR(frag[i],linebreaks);
  } else {
    try {
      st = n.innerHTML;
    } catch(err) {}
    var am = /amath|agraph/i.test(st);
    if ((st==null || st.indexOf("\$ ")!=-1 || st.indexOf("\$<")!=-1 || 
         st.indexOf("\\begin")!=-1 || am || st.slice(-1)=="$" ||
         st.indexOf("\$\n")!=-1)&& !/edit-content|HTMLArea|wikiedit/.test(st)){
      if (!avoidinnerHTML && translateLaTeXformatting) 
        st = simpleLaTeXformatting(st);
      if (st!=null && am && !avoidinnerHTML) {
//alert(st)
        st = st.replace(/<sup>(.*?)<\/sup>(\s|(\S))/gi,"^{$1} $3");
//        st = st.replace(/<\/?font.*?>/gi,""); // do this only in amath...end
        st = st.replace(/(Proof:)/g,"<i>$1</i>");
        st = st.replace(/QED/g,"&#x25A1;");
        //st = st.replace(/(\\?end{?a?math}?)/ig,"<span></span>$1");
        //st = st.replace(/(\bamath|\\begin{a?math})/ig,"<span></span>$1");
        st = st.replace(/([>\n])(Theorem|Lemma|Proposition|Corollary|Definition|Example|Remark|Problem|Exercise|Conjecture|Solution)(:|\W\W?(\w|\.)*?\W?:)/g,"$1<b>$2$3</b>");
      }
      st = st.replace(/%7E/g,"~");
      if (!avoidinnerHTML) n.innerHTML = st;
      LMprocessNodeR(n,linebreaks);
    }
  }
  if (isIE) { //needed to match size and font of formula to surrounding text
    frag = document.getElementsByTagName('math');
    for (var i=0;i<frag.length;i++) frag[i].update()
  }
}*/
