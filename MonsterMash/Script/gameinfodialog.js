/////////////////////////////////////////////////////////////////////////////////////////
//class GameInfoDialog
/////////////////////////////////////////////////////////////////////////////////////////
function GameInfoDialog(in_target)
{
    if (!(this instanceof GameInfoDialog))
	alert("GameInfoDialog: call constuctor with new keyword");

    PrintConsole("new GameInfoDialog " + in_target.m_name);
    
    this.m_oldGameMode = g_currentGameMode;
    g_currentGameMode = this;

    this.SetFocus(in_target);
}

GameInfoDialog.prototype.SetFocus = function(in_target)
{
    this.m_arrayObjects = [];
    this.m_target = in_target;
    this.m_arrayObjects.push(new GuiBox(
	8,
	8,
	g_canvas.width - 8,
	g_canvas.height - 8));
    // close button
    {
	var callback = {};
	callback.m_parent = this;
	callback.Run = function(in_button)
	{
	    this.m_parent.Close();
	};
	this.m_arrayObjects.push(new GuiButton(
	    g_canvas.width - 32,
	    16,
	    g_canvas.width - 16,
	    32,
	    "x",
	    callback));
    }
    this.m_arrayObjects.push(new GuiText(
	g_canvas.width * 0.5,
	20,
	in_target.m_name,
	s_defaultTextFont));

    var traceHeight = 48;

    if (in_target.m_parentSystem && (null != in_target.m_parentSystem))
    {
	this.m_arrayObjects.push(new GuiText(
	    72,
	    traceHeight,
	    "parent",
	    s_defaultTextFont));
	traceHeight += 16;

	var callback = {};
	var that = this;
	callback.m_target = in_target.m_parentSystem;
	callback.Run = function(in_button)
	{
	    that.SetFocus(this.m_target);
	};
	this.m_arrayObjects.push(new GuiButton(
	    16,
	    traceHeight,
	    128,
	    traceHeight + 16,
	    in_target.m_parentSystem.m_name,
	    callback));
	traceHeight += 32;
    }

    if (in_target.m_arrayChildren && (null != in_target.m_arrayChildren))
    {
	this.m_arrayObjects.push(new GuiText(
	    72,
	    traceHeight,
	    "children",
	    s_defaultTextFont));
	traceHeight += 16;
	var that = this;
	in_target.m_arrayChildren.forEach(function(in_child)
	{
	    var callback = {};
	    callback.m_target = in_child;
	    callback.Run = function(in_button)
	    {
		that.SetFocus(this.m_target);
	    };
	    that.m_arrayObjects.push(new GuiButton(
		16,
		traceHeight,
		128,
		traceHeight + 16,
		in_child.m_name,
		callback));
	    traceHeight += 32;
	});
    }
};

GameInfoDialog.prototype.Draw = function()
{
    g_context.fillStyle = "#000000";
    g_context.fillRect(0, 0, g_canvas.width, g_canvas.height);
    this.m_arrayObjects.forEach(function(in_item)
    {
	if (in_item.Draw)
	{
	    in_item.Draw();
	}
    });
};
GameInfoDialog.prototype.Tick = function(in_timeDelta)
{
    // input
    this.m_arrayObjects.forEach(function(in_item)
    {
	if (in_item.Input)
	{
	    in_item.Input();
	}
    });
    // tick
    this.m_arrayObjects.forEach(function(in_item)
    {
	if (in_item.Tick)
	{
	    in_item.Tick(in_timeDelta);
	}
    });
};
GameInfoDialog.prototype.Close = function()
{
    g_currentGameMode = this.m_oldGameMode;
};
