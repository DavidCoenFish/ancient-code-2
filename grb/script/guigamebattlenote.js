// guigamebattlenote.js

//just a view, no logic for changing zoom or offset, just displays what it is told
function GuiGameBattleNote(in_text, in_meterPos, in_fillStyle)
{
	//DEBUG if ( !(this instanceof GuiGameBattleNote) )
	//DEBUG {
	//DEBUG 	alert("GuiGameBattleNote: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_text = in_text;
	this.m_meterPos = in_meterPos;
	this.m_fillStyle = in_fillStyle;
	this.m_countdown = 1.0;
}

GuiGameBattleNote.prototype.Tick = function(in_timeDelta)
{
	this.m_countdown -= in_timeDelta;
	if (this.m_countdown < 0.0)
	{
		return false;
	}
	return true;
}

GuiGameBattleNote.prototype.Draw = function(in_context, in_canvas, in_converter)
{
	in_context.font = GuiTextGetSmallFont();
	in_context.textAlign = "center";		
	in_context.textBaseline = "middle";

	in_context.fillStyle = this.m_fillStyle;
	var pixelPos = in_converter.ConvertMeterToPixelPos(new Vector(this.m_meterPos.m_x, this.m_meterPos.m_y - (2.0 - this.m_countdown)));
	in_context.fillText(this.m_text, pixelPos.m_x, pixelPos.m_y);		
}
