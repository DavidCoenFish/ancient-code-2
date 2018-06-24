/////////////////////////////////////////////////////////////////////////////////////////
//class GameView
/////////////////////////////////////////////////////////////////////////////////////////
//note: game coordinates have zero at bottom of the screen 
function GameView(
    in_screenWidth,
    in_screenHeight,
    in_gameWidth,
    in_gameHeight,
    in_gameViewX,
    in_gameViewY,
    in_viewScale)
{
    if (!(this instanceof GameView))
	alert("GameView: call constuctor with new keyword");

    this.m_screenWidth = in_screenWidth; // ie 640
    this.m_screenHeight = in_screenHeight; // ie 480
    this.m_gameWidth = in_gameWidth;
    this.m_gameHeight = in_gameHeight;
    this.m_gameViewX = in_gameViewX; // in game space
    this.m_gameViewY = in_gameViewY; // in game space
    this.m_viewScale = in_viewScale; // game * scale = screen

    this.MoveView(0.0, 0.0, 1.0);
}

GameView.prototype.GameToScreenScalar = function(in_game)
{
    return (in_game * this.m_viewScale);
};
GameView.prototype.ScreenToGameScalar = function(in_screen)
{
    return (in_screen / this.m_viewScale);
};

GameView.prototype.GameToScreenX = function(in_gameX)
{
    // return ((in_gameX - this.m_gameViewLeft) * this.m_viewScale);
    // return in_gameX = (((in_screenX - (this.m_screenWidth * 0.5)) /
    // this.m_viewScale) + this.m_gameViewLeft);
    return ((in_gameX - this.m_gameViewX) * this.m_viewScale)
	    + (this.m_screenWidth * 0.5);
};
GameView.prototype.GameToScreenY = function(in_gameY)
{
    // return (this.m_gameViewTop - in_gameY) * this.m_viewScale;
    // return (this.m_gameViewTop - ((in_screenY + (this.m_screenHeight * 0.5))
    // / this.m_viewScale));
    return ((this.m_gameViewY - in_gameY) * this.m_viewScale)
	    + (this.m_screenHeight * 0.5);
};
GameView.prototype.ScreenToGameX = function(in_screenX)
{
    return (((in_screenX - (this.m_screenWidth * 0.5)) / this.m_viewScale) + this.m_gameViewX);
};
GameView.prototype.ScreenToGameY = function(in_screenY)
{
    return (this.m_gameViewY - ((in_screenY - (this.m_screenHeight * 0.5)) / this.m_viewScale));
};
GameView.prototype.MoveView = function(
    in_screenDeltaX,
    in_screenDeltaY,
    in_zoomFactor)
{
    // limit zoom
    this.m_viewScale *= in_zoomFactor;
    var minScale = Math.max(
	(this.m_screenWidth / this.m_gameWidth),
	(this.m_screenHeight / this.m_gameHeight));

    this.m_viewScale = Math.min(s_gameViewMaximumScale, this.m_viewScale);
    this.m_viewScale = Math.max(minScale, this.m_viewScale);

    // delta x
    var halfWidth = (this.m_screenWidth * 0.5) / this.m_viewScale;
    this.m_gameViewX += (in_screenDeltaX / this.m_viewScale);
    this.m_gameViewX = Math.max(halfWidth, this.m_gameViewX);
    this.m_gameViewX = Math.min(this.m_gameWidth - halfWidth, this.m_gameViewX);

    // delta y
    var halfHeight = (this.m_screenHeight * 0.5) / this.m_viewScale;
    this.m_gameViewY += (in_screenDeltaY / this.m_viewScale);
    this.m_gameViewY = Math.max(halfHeight, this.m_gameViewY);
    this.m_gameViewY = Math.min(
	this.m_gameHeight - halfHeight,
	this.m_gameViewY);
};

function ButtonZoomPlusFactory(in_gameView)
{
    var callback = {};
    callback.m_gameView = in_gameView;
    callback.Run = function(in_button)
    {
	this.m_gameView.MoveView(0, 0, 2.0);
    };
    return new GuiButton(
	g_canvas.width - 24,
	8,
	g_canvas.width - 8,
	24,
	"+",
	callback);
}

function ButtonZoomMinusFactory(in_gameView)
{
    var callback = {};
    callback.m_gameView = in_gameView;
    callback.Run = function(in_button)
    {
	this.m_gameView.MoveView(0, 0, 0.5);
    };
    return new GuiButton(
	g_canvas.width - 24,
	32,
	g_canvas.width - 8,
	48,
	"-",
	callback);
}