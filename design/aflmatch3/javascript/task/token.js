Task.Token = function(in_token, _dropTime)
{
	if ( !(this instanceof Task.Token) )
		alert("Task.Token: call constuctor with new keyword");	

	this.m_token = in_token;
	this.m_dropCountdown = (undefined == _dropTime) ? Task.Token.s_dropTime : _dropTime;
	this.m_selected = false;
	this.m_selectFade = 0.0;
	this.m_lastX;
	this.m_lastY;
}

Task.Token.s_dropTime = 1.0;
Task.Token.s_dropHeight = 600;
Task.Token.s_borderStepIn = 0.1;
Task.Token.s_fillStepIn = 0.25;
Task.Token.s_token = 
{
	"AddTurn" : 0,
	"MoveForward" : 1,
	"MoveSide" : 2,
	"Spoil" : 3,
	"GiveTurn" : 4,
	"Count" : 5
};

Task.Token.prototype.Input = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (!in_framework.m_input.m_mouseEdge || !in_framework.m_input.m_mouseDown)
		return false;

	if ((_originX <= in_framework.m_input.m_mouseX) &&
		(in_framework.m_input.m_mouseX <= (_originX + _sizeX)) &&
		(_originY <= in_framework.m_input.m_mouseY) &&
		(in_framework.m_input.m_mouseY <= (_originY + _sizeY)))
	{
		this.m_selected ^= true;
		if (!this.m_selected)
		{
			this.Deselect();
		}
		return true;
	}
	return false;
}

Task.Token.prototype.AllowInput = function()
{
	return (0 == this.m_dropCountdown);
}

Task.Token.prototype.Deselect = function()
{
	this.m_selectFade = 0.8;
	this.m_selected = false;
}

Task.Token.prototype.Select = function()
{
	this.m_selectFade = 0.0;
	this.m_selected = true;
}

Task.Token.prototype.Draw = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (0 < this.m_dropCountdown)
	{
		this.m_dropCountdown -= in_timeDelta;
		if (this.m_dropCountdown < 0)
			this.m_dropCountdown = 0;
	}

	if (0.0 < this.m_selectFade)
	{
		this.m_selectFade -= in_timeDelta;
	}

	var offset = Task.Token.s_dropHeight * this.m_dropCountdown;

	if (true == this.m_selected || (0.0 < this.m_selectFade))
	{	
		in_framework.m_context.save();
		in_framework.m_context.lineWidth = 5;
		in_framework.m_context.strokeStyle = "#FF9900";
		in_framework.m_context.globalAlpha = (this.m_selected) ? 0.8 : this.m_selectFade;
		in_framework.m_context.beginPath();
		in_framework.m_context.rect(_originX + 2, _originY + 2 - offset, _sizeX - 4, _sizeY - 4);
		in_framework.m_context.closePath();
		in_framework.m_context.stroke();
		in_framework.m_context.restore();
	}

	var style = "#000000";
	switch(this.m_token)
	{
	default:
	case Task.Token.s_token.AddTurn:
		style = "#00FF00";
		break;
	case Task.Token.s_token.MoveForward:
		style = "#007777";
		break;
	case Task.Token.s_token.MoveSide:
		style = "#0000FF";
		break;
	case Task.Token.s_token.Spoil:
		style = "#770077";
		break;
	case Task.Token.s_token.GiveTurn:
		style = "#FF0000";
		break;
	}

	in_framework.m_context.fillStyle = style;
	in_framework.m_context.strokeStyle = style;

	this.m_lastX = _originX;
	this.m_lastY = _originY;
	this.m_lastSizeX = _sizeX;
	this.m_lastSizeY = _sizeY;

	var borderStepIn = Task.Token.s_borderStepIn * _sizeX;
	in_framework.m_context.beginPath();
	in_framework.m_context.rect(_originX + borderStepIn, _originY + borderStepIn - offset, _sizeX - borderStepIn - borderStepIn, _sizeY - borderStepIn - borderStepIn);
	in_framework.m_context.closePath();
	in_framework.m_context.stroke();

	var fillStepIn = Task.Token.s_fillStepIn * _sizeX;
	in_framework.m_context.beginPath();
	in_framework.m_context.rect(_originX + fillStepIn, _originY + fillStepIn - offset, _sizeX - fillStepIn - fillStepIn, _sizeY - fillStepIn - fillStepIn);
	in_framework.m_context.closePath();
	in_framework.m_context.fill();

	return;
}

Task.Token.FactoryRandom = function()
{
	var token = Math.floor(Math.random() * 5);
	return new Task.Token(token);
}
