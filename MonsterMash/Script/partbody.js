/////////////////////////////////////////////////////////////////////////////////////////
//class PartBody
/////////////////////////////////////////////////////////////////////////////////////////
function PartBody(in_gamePosX, in_gamePosY, in_radius, in_skinType)
{
    if (!(this instanceof PartBody))
	alert("PartBody: call constuctor with new keyword");

    this.m_name = "Body" + GetUniqueId();
    this.m_gamePosX = in_gamePosX;
    this.m_gamePosY = in_gamePosY;
    this.m_radius = in_radius;
    this.m_skinType = in_skinType;
    this.m_dragActive = false; // contract with DragDropManager
    this.m_parentSystem = null; // contract with system
    
    this.m_arrayAblity = [];
    //this.m_arrayAblity.push(new AblityDigest());
    //this.m_arrayAblity.push(new AblityStoreFat());
    //this.m_arrayAblity.push(new AblityTransport());
}

PartBody.prototype.IsBodyType = function()
{
    return true;
};

PartBody.prototype.Draw = function(in_gameView, in_drawLayer)
{
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eMainOutline == in_drawLayer))
	this.m_skinType.DrawCircleOutline(
	    in_gameView,
	    this.m_gamePosX,
	    this.m_gamePosY,
	    this.m_radius);
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eMainFill == in_drawLayer))
	this.m_skinType.DrawCircleFill(
	    in_gameView,
	    this.m_gamePosX,
	    this.m_gamePosY,
	    this.m_radius);
};

AddDragDropCircleDragable(PartBody);
AddDragDropCircleTarget(PartBody);

//PartBody.prototype.DragDropReceiveDrop = function(in_dragable)
//{};
