/////////////////////////////////////////////////////////////////////////////////////////
//class PartPooHole
/////////////////////////////////////////////////////////////////////////////////////////
function PartPooHole(in_gamePosX, in_gamePosY, in_radius, in_skinType)
{
    if (!(this instanceof PartPooHole))
	alert("PartPooHole: call constuctor with new keyword");

    this.m_name = "PooHole" + GetUniqueId();
    this.m_gamePosX = in_gamePosX;
    this.m_gamePosY = in_gamePosY;
    this.m_radius = in_radius;
    this.m_skinType = in_skinType;
    this.m_dragActive = false; // contract with DragDropManager
    this.m_parentSystem = null; // contract with system
    
    this.m_arrayAblity = [];
    //this.m_arrayAblity.push(new AblityPoo());
    
}

PartPooHole.prototype.IsBodyType = function()
{
    return false;
};

PartPooHole.prototype.Draw = function(in_gameView, in_drawLayer)
{
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eUnderPartOutline == in_drawLayer))
    {
	this.m_skinType.DrawCircleOutline(in_gameView, this.m_gamePosX, this.m_gamePosY, this.m_radius);
    }
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eUnderPartFill == in_drawLayer))
    {
	this.m_skinType.DrawCircleFill(in_gameView, this.m_gamePosX, this.m_gamePosY, this.m_radius);
    }
};

AddDragDropCircleDragable(PartPooHole);
