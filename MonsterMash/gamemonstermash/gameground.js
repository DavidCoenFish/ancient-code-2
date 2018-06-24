/////////////////////////////////////////////////////////////////////////////////////////
//class GameGround
/////////////////////////////////////////////////////////////////////////////////////////
function GameGround(in_worldHeight)
{
	if (!(this instanceof GameGround))
		alert("GameGround: call constuctor with new keyword");

	var m_worldHeight = in_worldHeight;

	this.Draw = function(in_canvas, in_context, in_gameView, in_drawLayer)
	{
		if (s_drawLayerEnum.eBackground != in_drawLayer)
			return;
		
		in_context.strokeStyle = "#a44200";
		in_context.lineWidth = in_gameView.GameToScreenScalar(0.5);

		var screenHeight = in_gameView.GameToScreenY(m_worldHeight);

		in_context.beginPath();
		in_context.moveTo(0, screenHeight);
		in_context.lineTo(in_canvas.width, screenHeight);
		in_context.closePath();

		in_context.stroke();
	};
}

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:GameGround";
		return "Pass:GameGround";
	};

	g_arrayUnitTest.push(out_object);
}