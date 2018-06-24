/////////////////////////////////////////////////////////////////////////////////////////
//class System (a collection of parts)
/////////////////////////////////////////////////////////////////////////////////////////
function System(in_rootBody, in_objectList, in_dragDropManager)
{
    if (!(this instanceof System))
	alert("System: call constuctor with new keyword");
    this.m_name = "System" + GetUniqueId();
    this.m_arrayChildren = [];
    this.m_rootPart = in_rootBody;
    this.AddPart(in_rootBody, in_objectList);

    PrintConsole("" + in_dragDropManager);

    in_dragDropManager.AddDragTarget(this);
    this.m_dragDropManager = in_dragDropManager;
    this.m_objectList = in_objectList;
}

// take part off object list, put it on system
System.prototype.AddPart = function(inout_part, in_objectList)
{
    if (inout_part.m_parentSystem)
		inout_part.m_parentSystem.RemovePart(inout_part, in_objectList);
    in_objectList.removeItem(inout_part);
    this.m_arrayChildren.push(inout_part);
    inout_part.m_parentSystem = this;
};

// removing the last body from a system will destroy the system
System.prototype.RemovePart = function(in_part, inout_objectList)
{
    in_part.m_parentSystem = null;
    this.m_arrayChildren.removeItem(in_part);
    if (in_part != this.m_rootPart)
	return;
    this.m_rootPart = null;
    var that = this;
    this.m_arrayChildren.forEach(function(in_child)
    {
	if ((true == in_child.IsBodyType()) && (null == this.m_rootPart))
	    that.m_rootPart = in_child;
    });

    if (null != this.m_rootPart)
		return;

    // no root
    this.Destroy(inout_objectList);
};

// put all children on object list, take self off object list, unregisted drag
// and drop
System.prototype.Destroy = function(inout_objectList)
{
    this.m_arrayChildren.forEach(function(in_child)
    {
		in_child.m_parentSystem = null;
		inout_objectList.push(in_child);
    });
    this.m_arrayChildren = [];

    inout_objectList.removeItem(this);

    this.m_dragDropManager.RemoveDragTarget(this);
};

System.prototype.Draw = function(in_gameView, in_drawLayer)
{
    this.m_arrayChildren.forEach(function(in_child)
    {
		in_child.Draw(in_gameView, in_drawLayer);
    });
};

System.prototype.Input = function(in_gameView, in_dragDropManager)
{
    // pass down to children
    this.m_arrayChildren.forEach(function(in_child)
    {
		in_child.Input(in_gameView, in_dragDropManager);
    });
};

System.prototype.Move = function(in_gameX, in_gameY)
{
    this.m_arrayChildren.forEach(function(in_child)
    {
		in_child.m_gamePosX += in_gameX;
		in_child.m_gamePosY += in_gameY;
    });
};

System.prototype.DragDropHitBox = function(
    in_gameView,
    in_screenLeft,
    in_screenTop,
    in_screenRight,
    in_screenBottom)
{
    var best = 0.0;
    this.m_arrayChildren.forEach(function(in_child)
    {
		if (!in_child.DragDropHitBox)
	    	return;
		var result = in_child.DragDropHitBox(
	    	in_gameView,
	    	in_screenLeft,
	    	in_screenTop,
	    	in_screenRight,
	    	in_screenBottom);
		if (best < result)
	    	best = result;
    });
    return best;
};

System.prototype.DragDropCircle = function(
    in_gameView,
    in_screenX,
    in_screenY,
    in_screenRadius)
{
    var best = 0.0;
    this.m_arrayChildren.forEach(function(in_child)
    {
		if (!in_child.DragDropHitBox)
	    	return;
		var result = in_child.DragDropCircle(
	    	in_gameView,
	    	in_screenX,
	    	in_screenY,
	    	in_screenRadius);
		if (best < result)
		    best = result;
    });
    return best;
};

System.prototype.DragDropReceiveDrop = function(in_dragable)
{
    // dropping something without a system, onto a system, add it to the system
    if (!in_dragable.m_parentSystem)
    {
		this.AddPart(in_dragable, this.m_objectList);
    }
    else
    {
    	//add one system to another?
    	
    }
};
