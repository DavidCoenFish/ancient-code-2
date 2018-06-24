/////////////////////////////////////////////////////////////////////////////////////////
//class GameModeWorkbench
/////////////////////////////////////////////////////////////////////////////////////////
function StateWorkbench(in_canvas, in_context)
{
	if (!(this instanceof StateWorkbench))
		alert("StateWorkbench: call constuctor with new keyword");


//	/var that = this;
	var m_xray = {
		"m_value" : false
	};
	var m_gameView = new GameView(
		in_canvas.width,
		in_canvas.height,
		s_workspaceWorldWidth,
		s_workspaceWorldHeight,
		new Vector(s_workspaceDefaultViewX, s_workspaceDefaultViewY),
		s_workspaceDefaultScale);
	//var m_dragDropManager = new DragDropManager();

    var s_backgroundGradient = in_context.createLinearGradient(
    	0,
    	in_canvas.height,
    	0,
    	0);
    s_backgroundGradient.addColorStop(0.0, "#554182");
    s_backgroundGradient.addColorStop(0.2, "#509dd9");
    s_backgroundGradient.addColorStop(1.0, "#0c205d");
	
	var m_arrayObjects = [];
	m_arrayObjects.push(new GameGround(s_workspaceDefaultGroundHeight));

	var m_arrayObjectsGui = [];
	//m_arrayObjectsGui.push(ButtonZoomPlusFactory(m_gameView));
	//m_arrayObjectsGui.push(ButtonZoomMinusFactory(m_gameView));
	m_arrayObjectsGui.push(ButtonToggleFactory(
		m_xray,
		"XRAY",
		in_canvas.width - 96,
		8,
		in_canvas.width - 32,
		24));
	
	m_arrayObjectsGui.push(ButtonZoomPlusFactory(m_gameView, in_canvas));
	m_arrayObjectsGui.push(ButtonZoomMinusFactory(m_gameView, in_canvas));
	
	this.Input = function(in_game, in_input)
	{
	};
	
	this.Tick = function(in_timeDelta)
	{
	};
	
	this.Draw = function(in_canvasParam, in_contextParam)
	{
    	in_contextParam.fillStyle = s_backgroundGradient;
    	in_contextParam.fillRect(0, 0, in_canvasParam.width, in_canvasParam.height);
    
    	var arrayDrawLayer = GetdrawLayerOrder(m_xray.m_value);
    
    	arrayDrawLayer.forEach(function(in_drawLayer)
    	{
    		m_arrayObjects.forEach(function(in_item)
    		{
    			if (in_item.Draw)
    				in_item.Draw(in_canvasParam, in_contextParam, m_gameView, in_drawLayer);
    		});
    	});
    
    	m_arrayObjectsGui.forEach(function(in_item)
    	{
    		if (in_item.Draw)
    			in_item.Draw(in_canvasParam, in_contextParam);
    	});
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
			return "Fail:StateWorkbench";
		return "Pass:StateWorkbench";
	};

	g_arrayUnitTest.push(out_object);
}