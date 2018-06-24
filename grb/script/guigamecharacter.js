// guigamecharacter.js

function GuiGameCharacter(in_character, in_pixelOrigin, in_pixelSize, in_flip, in_callbackTarget, in_callbackFunctionKey, in_action, in_actionTime)
{
	//DEBUG if ( !(this instanceof GuiGameCharacter) )
	//DEBUG {
	//DEBUG 	alert("GuiGameCharacter: call constuctor with new keyword");	
	//DEBUG }
	
	if (undefined == in_callbackTarget)
	{
		in_callbackTarget = null;
	}
	if (undefined == in_callbackFunctionKey)
	{
		in_callbackFunctionKey = null;
	}		
	if (undefined == in_action)
	{
		in_action = s_gameDrawAction.e_idle;
	}
	if (undefined == in_actionTime)
	{
		in_actionTime = 0.0;
	}
	
	this.m_character = in_character;
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_flip = in_flip;
	this.m_callbackTarget = in_callbackTarget;
	this.m_callbackFunctionKey = in_callbackFunctionKey;
	this.m_action = in_action;
	this.m_actionTime = in_actionTime;
	this.m_rollover = false;
}

GuiGameCharacter.prototype.Draw = function(in_context, in_canvas)
{
	GameDrawCharacter(
		in_context, 
		in_canvas, 
		this.m_pixelOrigin, 
		this.m_pixelSize, 
		this.m_flip, 
		this.m_character, 
		this.m_action, 
		this.m_actionTime, 
		this.m_character.m_name,
		this.m_rollover
		);
}

GuiGameCharacter.prototype.Tick = function(in_timeDelta)
{
	this.m_time += in_timeDelta;
	
	var lowX = this.m_pixelOrigin.m_x - (0.3 * this.m_pixelSize.m_x);
	var highX = this.m_pixelOrigin.m_x + (0.3 * this.m_pixelSize.m_x);

	var lowY = this.m_pixelOrigin.m_y - (1.0 * this.m_pixelSize.m_y);
	var highY = this.m_pixelOrigin.m_y + 10;
	
	
	this.m_rollover = ((lowX < g_mouseX) &&
          (g_mouseX < highX) &&
          (lowY < g_mouseY) &&
          (g_mouseY < highY));
	
    //call callback on mouse down
    if ((true == this.m_rollover) &&
		(this.m_callbackTarget != null) &&
        (true == g_mouseEdge) &&
        (true == g_mouseDown))
    {
	  g_mouseEdge = false; //consume mouse input
	  this.m_callbackTarget[this.m_callbackFunctionKey](this);
    }	
}

//-- END // End Concatinate, unit test or other follows

