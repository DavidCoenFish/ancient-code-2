//s_mouthHerbivor
/////////////////////////////////////////////////////////////////////////////////////////
//class PartMouth
/////////////////////////////////////////////////////////////////////////////////////////
function PartMouth(in_gamePosX, in_gamePosY, in_radius, in_skinType)
{
    if (!(this instanceof PartMouth))
	alert("PartMouth: call constuctor with new keyword");

    this.m_name = "Mouth" + GetUniqueId();
    this.m_gamePosX = in_gamePosX;
    this.m_gamePosY = in_gamePosY;
    this.m_radius = in_radius;
    this.m_skinType = in_skinType;
    this.m_dragActive = false; // contract with DragDropManager
    this.m_parentSystem = null; // contract with system
    
    this.m_arrayAblity = [];
    //this.m_arrayAblity.push(new AblityEat());
    
}

PartMouth.prototype.IsBodyType = function()
{
    return false;
};

PartMouth.prototype.Draw = function(in_gameView, in_drawLayer)
{
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eOverPartOutline == in_drawLayer))
    {
	this.m_skinType.DrawCircleOutline(in_gameView, this.m_gamePosX, this.m_gamePosY, this.m_radius, Math.PI, 0.0);
    }
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eOverPartFill == in_drawLayer))
    {
	this.m_skinType.DrawCircleFill(in_gameView, this.m_gamePosX, this.m_gamePosY, this.m_radius, Math.PI, 0.0);
    }
};

AddDragDropCircleDragable(PartMouth);
