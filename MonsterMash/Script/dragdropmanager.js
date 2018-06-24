/////////////////////////////////////////////////////////////////////////////////////////
//class DragDropManager
//
//Dragable.prototype.DragDropUpdatePosition(in_gameView, in_screenDeltaX, in_screenDeltaY)
//Dragable.prototype.DragDropTestTarget(in_gameView, in_dropTarget) = float [0 ... 1], 0 not a hit, 1 a hit right in the center
//Dragable.prototype.DragDropOnDrop(in_dropTargetNULLABLE) //let the dragable know that it has been dropped, default implementation is nop
//
//DragTarget.prototype.DragDropHitBox(in_gameView, in_screenLeft, in_screenTop, in_screenRight, in_screenBottom) = float
//DragTarget.prototype.DragDropCircle(in_gameView, in_screenX, in_screenY, in_screenRadius) = float
//DragTarget.prototype.DragDropReceiveDrop(in_dragable)
//
/////////////////////////////////////////////////////////////////////////////////////////
function DragDropManager()
{
    if (!(this instanceof DragDropManager))
	alert("DragDropManager: call constuctor with new keyword");

    var that = this;
    var m_currentDragObject = null;
    var m_arrayDragTarget = [];

    this.TestCurrentDragObject = function(in_dragObject)
    {
	return (in_dragObject == m_currentDragObject);
    };
    this.GetDragActive = function()
    {
	return (null != m_currentDragObject);
    };
    this.SetDragObject = function(in_dragObject)
    {
	if (null != m_currentDragObject)
	    m_currentDragObject.m_dragActive = false;

	m_currentDragObject = in_dragObject;
	if (null != m_currentDragObject)
	    m_currentDragObject.m_dragActive = true;
    };
    this.AddDragTarget = function(in_dragTarget)
    {
	m_arrayDragTarget.push(in_dragTarget);
    };
    this.RemoveDragTarget = function(in_dragTarget)
    {
	m_arrayDragTarget.remove(in_dragTarget);
    };
    this.Update = function(in_gameView)
    {
	if (!this.GetDragActive())
	    return;

	if (true == g_mouseDown)
	{
	    m_currentDragObject.DragDropUpdatePosition(in_gameView, g_mouseX
		    - g_mouseXOld, g_mouseY - g_mouseYOld);
	    return;
	}
	var currentDrag = m_currentDragObject;
	that.SetDragObject(null);

	var bestHitValue = 0.0;
	var bestHitTarget = null;
	m_arrayDragTarget.forEach(function(in_item)
	{
	    if (currentDrag == in_item)
		return;
	    // don't drop self on parent system. BROKEN ENCAPSULATION
	    if (currentDrag.m_parentSystem
		    && (currentDrag.m_parentSystem == in_item))
		return;
	    var testHitValue = currentDrag.DragDropTestTarget(
		in_gameView,
		in_item);
	    if (bestHitValue < testHitValue)
	    {
		bestHitValue = testHitValue;
		bestHitTarget = in_item;
	    }
	});

	currentDrag.DragDropOnDrop(bestHitTarget);

	if (null != bestHitTarget)
	    bestHitTarget.DragDropReceiveDrop(currentDrag);
    };
}

function DragBoxBoxHit(
    in_lhsLeft,
    in_lhsTop,
    in_lhsRight,
    in_lhsBottom,
    in_rhsLeft,
    in_rhsTop,
    in_rhsRight,
    in_rhsBottom)
{
    var overlap = ((in_rhsLeft <= in_lhsRight) && (in_lhsLeft <= in_rhsRight)
	    && (in_rhsBottom <= in_lhsTop) && (in_lhsBottom <= in_rhsTop));
    if (false == overlap)
	return 0.0;

    var lhsX = (in_lhsLeft + in_lhsRight) * 0.5;
    var lhsY = (in_lhsTop + in_lhsBottom) * 0.5;
    var lhsRadius = Math
	    .min(in_lhsRight - in_lhsLeft, in_lhsTop - in_lhsBottom);
    var rhsX = (in_rhsLeft + in_rhsRight) * 0.5;
    var rhsY = (in_rhsTop + in_rhsBottom) * 0.5;
    var rhsRadius = Math
	    .min(in_rhsRight - in_rhsLeft, in_rhsTop - in_rhsBottom);

    return (Math.max(0.01, DragCircleCircleHit(
	lhsX,
	lhsY,
	lhsRadius,
	rhsX,
	rhsY,
	rhsRadius)));
}
function DragBoxCircleHit(
    in_lhsLeft,
    in_lhsTop,
    in_lhsRight,
    in_lhsBottom,
    in_rhsX,
    in_rhsY,
    in_rhsRadius)
{
    var boxClosestX = Math.max(in_lhsLeft, Math.min(in_lhsRight, in_rhsX));
    var boxClosestY = Math.max(in_lhsBottom, Math.min(in_lhsTop, in_rhsY));
    return DragCircleCircleHit(
	boxClosestX,
	boxClosestY,
	0.0,
	in_rhsX,
	in_rhsY,
	in_rhsRadius);
}
function DragCircleCircleHit(
    in_lhsX,
    in_lhsY,
    in_lhsRadius,
    in_rhsX,
    in_rhsY,
    in_rhsRadius)
{
    var lengthSquared = GetLengthSquared(in_lhsX - in_rhsX, in_lhsY - in_rhsY);
    var targetLengthSquared = (in_lhsRadius + in_rhsRadius)
	    * (in_lhsRadius + in_rhsRadius);
    if (targetLengthSquared < lengthSquared)
	return 0.0;
    if (0.0 != targetLengthSquared)
	return (1.0 - (lengthSquared / targetLengthSquared));
    return 1.0;
}

function AddDragDropCommonDragable(in_object)
{
    in_object.prototype.Input = function(in_gameView, in_dragDropManager)
    {
	var hit = this.Hit(in_gameView, g_mouseX, g_mouseY);
	if (true == hit)
	{
	    if (true == g_mouseDoubleClick)
	    {
		new GameInfoDialog(this);
		in_dragDropManager.SetDragObject(null);
		g_mouseDoubleClick = false; //conseume double click
	    }
	    // if mouse down then put on drag and drop
	    if ((true == g_mouseDown)
		    && (false == in_dragDropManager.GetDragActive()))
	    {
		in_dragDropManager.SetDragObject(this);
	    }
	}
    };

    in_object.prototype.DragDropUpdatePosition = function(
	in_gameView,
	in_screenDeltaX,
	in_screenDeltaY)
    {
	var gameX = in_gameView.ScreenToGameScalar(in_screenDeltaX);
	var gameY = in_gameView.ScreenToGameScalar(-in_screenDeltaY);

	// doh, this breaks encapsulation of dragdrop (gains knowledge about
	// parent) BROKEN ENCAPSULATION should not be common function?
	if (this.m_parentSystem)
	{
	    this.m_parentSystem.Move(gameX, gameY);
	    return;
	}

	this.m_gamePosX += gameX;
	this.m_gamePosY += gameY;
    };

    in_object.prototype.DragDropOnDrop = function(in_dropTargetNULLABLE) // let
									    // the
									    // dragable
									    // know
									    // that
									    // it
									    // has
									    // been
									    // dropped,
									    // default
									    // implementation
									    // is
									    // nop
    {
    // NOP
    };
}

function AddDragDropCircleDragable(in_object)
{
    AddDragDropCommonDragable(in_object);

    in_object.prototype.Hit = function(in_gameView, in_screenX, in_screenY)
    {
	var screenRadius = in_gameView.GameToScreenScalar(this.m_radius);
	var screenX = in_gameView.GameToScreenX(this.m_gamePosX);
	var screenY = in_gameView.GameToScreenY(this.m_gamePosY);

	var distanceSquared = GetLengthSquared(in_screenX - screenX, in_screenY
		- screenY);

	return (distanceSquared <= (screenRadius * screenRadius));
    };

    in_object.prototype.DragDropTestTarget = function(
	in_gameView,
	in_dropTarget)
    {
	PrintConsole("DragDropTestTarget0 " + this.m_name);
	if (in_dropTarget)
	    PrintConsole("DragDropTestTarget1 " + in_dropTarget.m_name);
	return in_dropTarget.DragDropCircle(in_gameView, in_gameView
		.GameToScreenX(this.m_gamePosX), in_gameView
		.GameToScreenY(this.m_gamePosY), in_gameView
		.GameToScreenScalar(this.m_radius));
    };
}

function AddDragDropCircleTarget(in_object)
{
    in_object.prototype.DragDropHitBox = function(
	in_gameView,
	in_screenLeft,
	in_screenTop,
	in_screenRight,
	in_screenBottom)
    {
	return DragBoxCircleHit(
	    in_gameView.ScreenToGameX(in_screenLeft),
	    in_gameView.ScreenToGameY(in_screenTop),
	    in_gameView.ScreenToGameX(in_screenRight),
	    in_gameView.ScreenToGameY(in_screenBottom),
	    this.m_gamePosX,
	    this.m_gamePosY,
	    this.m_radius);
    };
    in_object.prototype.DragDropCircle = function(
	in_gameView,
	in_screenX,
	in_screenY,
	in_screenRadius)
    {
	return DragCircleCircleHit(
	    in_gameView.ScreenToGameX(in_screenX),
	    in_gameView.ScreenToGameY(in_screenY),
	    in_gameView.ScreenToGameScalar(in_screenRadius),
	    this.m_gamePosX,
	    this.m_gamePosY,
	    this.m_radius);
    };
}
