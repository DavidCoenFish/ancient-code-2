/////////////////////////////////////////////////////////////////////////////////////////
//class GameModeWorkbench
/////////////////////////////////////////////////////////////////////////////////////////
function StateWorkbench()
{
    if (!(this instanceof StateWorkbench))
	alert("StateWorkbench: call constuctor with new keyword");

    this.m_xray = {
	"m_value" : false
    };
    this.m_gameView = new GameView(
	g_canvas.width,
	g_canvas.height,
	s_workspaceWorldWidth,
	s_workspaceWorldHeight,
	s_workspaceDefaultViewX,
	s_workspaceDefaultViewY,
	s_workspaceDefaultScale);
    this.m_dragDropManager = new DragDropManager();

    this.m_arrayObjects = [];
    this.m_arrayObjects.push(new GameGround(s_workspaceDefaultGroundHeight));
    this.m_arrayObjects.push(new PartBody(500.0, 12.5, 2.5, SkinType.s_fluffy));
    this.m_arrayObjects.push(new PartBrain(505.0, 12.0, 2, SkinType.s_brain));
    this.m_arrayObjects.push(new PartMouth(495.0, 12.0, 1.5, SkinType.s_mouthHerbivor));
    this.m_arrayObjects.push(new PartPooHole(490.0, 11.0, 0.2, SkinType.s_pooHole));

    this.m_arrayObjectsGui = [];

    this.m_arrayObjectsGui.push(ButtonZoomPlusFactory(this.m_gameView));
    this.m_arrayObjectsGui.push(ButtonZoomMinusFactory(this.m_gameView));
    this.m_arrayObjectsGui.push(ButtonToggleFactory(
	this.m_xray,
	"XRAY",
	g_canvas.width - 96,
	8,
	g_canvas.width - 32,
	24));
}

StateWorkbench.prototype.Draw = function()
{
    g_context.fillStyle = StateWorkbench.s_backgroundGradient;
    g_context.fillRect(0, 0, g_canvas.width, g_canvas.height);

    var that = this;
    var arrayDrawLayer = GetdrawLayerOrder(this.m_xray.m_value);

    arrayDrawLayer.forEach(function(in_drawLayer)
    {
	that.m_arrayObjects.forEach(function(in_item)
	{
	    if (in_item.Draw)
	    {
		in_item.Draw(that.m_gameView, in_drawLayer);
	    }
	});
    });

    this.m_arrayObjectsGui.forEach(function(in_item)
    {
	if (in_item.Draw)
	{
	    in_item.Draw();
	}
    });

    // PrintConsole("" + this.m_xray.m_value);
};

StateWorkbench.prototype.Tick = function(in_timeDelta)
{
    // what an ugly place to put this. make a system for any body that has no
    // parent array
    // itterate over a copy of the array, so we don't add/ remove to the array
    // we are traversing
    var oldArray = this.m_arrayObjects.slice(0);
    var that = this;
    oldArray.forEach(function(in_item)
    {
	if (!in_item.IsBodyType)
	    return;
	if (!in_item.IsBodyType())
	    return;
	if (!in_item.m_parentSystem) // not undefined and not null
	    that.m_arrayObjects.push(new System(
		in_item,
		that.m_arrayObjects,
		that.m_dragDropManager));
    });

    // input
    var refGameView = this.m_gameView;
    var refDragDropManager = this.m_dragDropManager;
    this.m_arrayObjects.forEach(function(in_item)
    {
	if (in_item.Input)
	{
	    in_item.Input(refGameView, refDragDropManager);
	}
    });
    this.m_arrayObjectsGui.forEach(function(in_item)
    {
	if (in_item.Input)
	{
	    in_item.Input();
	}
    });

    this.m_dragDropManager.Update(this.m_gameView);

    // mouse down but not dragging anything, move view
    if ((true == g_mouseDown)
	    && (false == this.m_dragDropManager.GetDragActive()))
	this.m_gameView.MoveView(
	    g_mouseXOld - g_mouseX,
	    g_mouseY - g_mouseYOld,
	    1.0);

    // tick
    this.m_arrayObjects.forEach(function(in_item)
    {
	if (in_item.Tick)
	{
	    in_item.Tick(in_timeDelta);
	}
    });
    this.m_arrayObjectsGui.forEach(function(in_item)
    {
	if (in_item.Tick)
	{
	    in_item.Tick(in_timeDelta);
	}
    });
};

StateWorkbench.s_backgroundGradient = g_context.createLinearGradient(
    0,
    g_canvas.height,
    0,
    0);
StateWorkbench.s_backgroundGradient.addColorStop(0.0, "#554182");
StateWorkbench.s_backgroundGradient.addColorStop(0.2, "#509dd9");
StateWorkbench.s_backgroundGradient.addColorStop(1.0, "#0c205d");
