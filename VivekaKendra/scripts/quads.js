
function drawRectangles()
{
	var canvas=document.getElementsByName("myCanvas");
	var i=0

	for(i=0;i<canvas.length;i++)
	{
		var x=20
		var y= 20
		var j=0;
		var ht=140
		var l=0;
		// Resize the canvas height as per the drawing requirements.
		// However resize clears the canvas and the contents will have to be redrawn.
		// So, iterate through the drawings for the row to find the max height and then proceed to draw.
		for(j=0; j< myRects[i].length; j++)
		{
		l=Number(myRects[i][j])*g_scale;
		txtY =  y+l*1+10;
		ht = (ht>txtY+20)?ht:txtY+20
		tdH =  canvas[i].parentNode.height;
		canvas[i].parentNode.height = ht;
		canvas[i].height =ht;
		}

		for(j=0; j< myRects[i].length; j++)
		{ 
			var ctx=canvas[i].getContext("2d");
			ctx.font="12px Arial";
			l=Number(myRects[i][j])*g_scale;
			ctx.lineWidth=2;
			ctx.strokeRect(x,y,l,l);
			ctx.fillStyle="#"+((1<<12)*Math.random()|0).toString(16); //"#"+(i+j+10)*32;
			ctx.fillRect(x,y,l,l);
			ctx.fillStyle="#000000";
			var recTxt = (g_lable != "")? g_lable : myLable[i][j];
			var txtX = ctx.measureText(recTxt).width;
			txtX=(txtX*1 < l*1)? l : txtX*1;
			txtY =  y+l*1+10;
			ctx.fillText(recTxt,x,txtY);
			x += txtX*1+20;
		}
	}
}

