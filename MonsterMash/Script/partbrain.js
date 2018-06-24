/////////////////////////////////////////////////////////////////////////////////////////
//class PartBrain
/////////////////////////////////////////////////////////////////////////////////////////
function PartBrain(in_gamePosX, in_gamePosY, in_radius, in_skinType)
{
    if (!(this instanceof PartBrain))
	alert("PartBrain: call constuctor with new keyword");

    this.m_name = "Brain" + GetUniqueId();
    this.m_gamePosX = in_gamePosX;
    this.m_gamePosY = in_gamePosY;
    this.m_radius = in_radius;
    this.m_skinType = in_skinType;
    this.m_dragActive = false; // contract with DragDropManager
    this.m_parentSystem = null; // contract with system
    
    this.m_arrayAblity = [];
    //this.m_arrayAblity.push(new AblityThink());
        
}

PartBrain.prototype.IsBodyType = function()
{
    return false;
};

PartBrain.prototype.Draw = function(in_gameView, in_drawLayer)
{
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eUnderPartOutline == in_drawLayer))
    {
	this.m_skinType.DrawCircleOutline(in_gameView, this.m_gamePosX
		+ (0.5 * this.m_radius), this.m_gamePosY
		+ (0.04 * this.m_radius), this.m_radius * 0.45);
	this.m_skinType.DrawCircleOutline(in_gameView, this.m_gamePosX
		+ (0.26 * this.m_radius), this.m_gamePosY
		+ (0.16 * this.m_radius), this.m_radius * 0.45);
	this.m_skinType.DrawCircleOutline(in_gameView, this.m_gamePosX
		- (0.1 * this.m_radius), this.m_gamePosY
		+ (0.2 * this.m_radius), this.m_radius * 0.45);
	this.m_skinType.DrawCircleOutline(in_gameView, this.m_gamePosX
		- (0.5 * this.m_radius), this.m_gamePosY, this.m_radius * 0.45);
    }
    if ((undefined == in_drawLayer)
	    || (s_drawLayerEnum.eUnderPartFill == in_drawLayer))
    {
	this.m_skinType.DrawCircleFill(in_gameView, this.m_gamePosX
		+ (0.5 * this.m_radius), this.m_gamePosY
		+ (0.04 * this.m_radius), this.m_radius * 0.45);
	this.m_skinType.DrawCircleFill(in_gameView, this.m_gamePosX
		+ (0.26 * this.m_radius), this.m_gamePosY
		+ (0.16 * this.m_radius), this.m_radius * 0.45);
	this.m_skinType.DrawCircleFill(in_gameView, this.m_gamePosX
		- (0.1 * this.m_radius), this.m_gamePosY
		+ (0.2 * this.m_radius), this.m_radius * 0.45);
	this.m_skinType.DrawCircleFill(in_gameView, this.m_gamePosX
		- (0.5 * this.m_radius), this.m_gamePosY, this.m_radius * 0.45);
    }
};

AddDragDropCircleDragable(PartBrain);
