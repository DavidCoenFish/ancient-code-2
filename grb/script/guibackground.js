//guibackground.js

function GuiBackgroud(in_fillStyle)
{
	//DEBUG if ( !(this instanceof GuiBackgroud) )
	//DEBUG {
	//DEBUG 	alert("GuiBackgroud: call constuctor with new keyword");	
	//DEBUG }

	this.m_fillStyle = in_fillStyle;
}

GuiBackgroud.prototype.Draw = function(in_context, in_canvas)
{
	in_context.fillStyle = this.m_fillStyle;
	in_context.fillRect(0, 0, in_canvas.width, in_canvas.height);
}

//-- END // End Concatinate, unit test or other follows

