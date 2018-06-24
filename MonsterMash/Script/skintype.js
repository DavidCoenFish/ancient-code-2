/////////////////////////////////////////////////////////////////////////////////////////
//class SkinType
/////////////////////////////////////////////////////////////////////////////////////////
function SkinType(in_name, in_fillStyle, in_strokeStyle, in_strokeGameThickness)
{
    if (!(this instanceof SkinType))
	alert("SkinType: call constuctor with new keyword");

    this.m_name = in_name;
    this.m_fillStyle = in_fillStyle;
    this.m_strokeStyle = in_strokeStyle;
    this.m_strokeGameThickness = in_strokeGameThickness;
}

SkinType.s_fluffy = new SkinType("Fluffy", "#C0C0C0", "#404060", 0.2);
SkinType.s_brain = new SkinType("Brain", "#e38686", "#602a77", 0.1);
SkinType.s_mouthHerbivor = new SkinType("Herbivor", "#e8df90", "#946e12", 0.1);
SkinType.s_pooHole = new SkinType("PooHole", "#d06c61", "#6a3607", 0.2);

SkinType.prototype.DrawCircleOutline = function(
    in_gameView,
    in_gamePosX,
    in_gamePosY,
    in_radius,
    in_startRadian,
    in_endRadian)
{
    if (0.0 < this.m_strokeGameThickness)
    {
	var screenRadius = in_gameView.GameToScreenScalar(in_radius);
	var screenX = in_gameView.GameToScreenX(in_gamePosX);
	var screenY = in_gameView.GameToScreenY(in_gamePosY);
	if (in_startRadian === undefined)
	    in_startRadian = 0.0;
	if (in_endRadian === undefined)
	    in_endRadian = Math.PI * 2.0;

	g_context.beginPath();
	g_context.arc(
	    screenX,
	    screenY,
	    screenRadius,
	    in_startRadian,
	    in_endRadian,
	    true);
	g_context.closePath();

	g_context.lineWidth = in_gameView
		.GameToScreenScalar(this.m_strokeGameThickness);
	g_context.strokeStyle = this.m_strokeStyle;
	g_context.stroke();
    }
};

SkinType.prototype.DrawCircleFill = function(
    in_gameView,
    in_gamePosX,
    in_gamePosY,
    in_radius,
    in_startRadian,
    in_endRadian)
{
    var screenRadius = in_gameView.GameToScreenScalar(in_radius);
    var screenX = in_gameView.GameToScreenX(in_gamePosX);
    var screenY = in_gameView.GameToScreenY(in_gamePosY);
    if (in_startRadian === undefined)
	in_startRadian = 0.0;
    if (in_endRadian === undefined)
	in_endRadian = Math.PI * 2.0;

    g_context.beginPath();
    g_context.arc(
	screenX,
	screenY,
	screenRadius,
	in_startRadian,
	in_endRadian,
	true);
    g_context.closePath();

    g_context.fillStyle = this.m_fillStyle;
    g_context.fill();
};
