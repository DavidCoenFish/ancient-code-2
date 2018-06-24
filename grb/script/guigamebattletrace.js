// guigamebattletrace.js

function GuiGameBattleTrace(in_meterPosStart, in_meterPosFinish, in_fillRed, in_fillGreen, in_fillBlue)
{
	//DEBUG if ( !(this instanceof GuiGameBattleTrace) )
	//DEBUG {
	//DEBUG 	alert("GuiGameBattleTrace: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_meterPosStart = in_meterPosStart;
	this.m_meterPosFinish = in_meterPosFinish;
	this.m_fillRed = Math.floor(in_fillRed);
	this.m_fillGreen = Math.floor(in_fillGreen);
	this.m_fillBlue = Math.floor(in_fillBlue);
	this.m_countdown = 1.0;
}

GuiGameBattleTrace.prototype.Tick = function(in_timeDelta)
{
	this.m_countdown -= in_timeDelta;
	if (this.m_countdown < 0.0)
	{
		return false;
	}
	return true;
}

GuiGameBattleTrace.prototype.Draw = function(in_context, in_canvas, in_converter)
{
	var pixelPosStart = in_converter.ConvertMeterToPixelPos(this.m_meterPosStart);
	var pixelPosFinish = in_converter.ConvertMeterToPixelPos(this.m_meterPosFinish);

	var gradient = in_context.createLinearGradient(pixelPosStart.m_x, pixelPosStart.m_y, pixelPosFinish.m_x, pixelPosFinish.m_y);
	gradient.addColorStop(0.0, "rgba(" + this.m_fillRed + ", " + this.m_fillGreen + ", " + this.m_fillBlue + ", 0)");
	var alpha = Math.floor(this.m_countdown * 255);
	gradient.addColorStop(1.0, "rgba(" + this.m_fillRed + ", " + this.m_fillGreen + ", " + this.m_fillBlue + ", " + alpha + ")");

	in_context.beginPath();
	in_context.moveTo(pixelPosStart.m_x, pixelPosStart.m_y);
	in_context.lineTo(pixelPosFinish.m_x, pixelPosFinish.m_y);	
	in_context.strokeStyle = gradient;	
	in_context.stroke();	
}
