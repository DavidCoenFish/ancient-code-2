/////////////////////////////////////////////////////////////////////////////////////////
//class GameGround
/////////////////////////////////////////////////////////////////////////////////////////
function GameGround(in_worldHeight)
{
    if (!(this instanceof GameGround))
	alert("GameGround: call constuctor with new keyword");

    this.m_worldHeight = in_worldHeight;
}

GameGround.prototype.Draw = function(in_gameView)
{
    g_context.strokeStyle = "#a44200";
    g_context.lineWidth = in_gameView.GameToScreenScalar(0.5);

    var screenHeight = in_gameView.GameToScreenY(this.m_worldHeight);

    g_context.beginPath();
    g_context.moveTo(0, screenHeight);
    g_context.lineTo(g_canvas.width, screenHeight);
    g_context.closePath();

    g_context.fill();
    g_context.stroke();
};
