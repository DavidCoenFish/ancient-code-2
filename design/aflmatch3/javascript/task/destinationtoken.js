Task.DestinationToken = function(in_token)
{
	if ( !(this instanceof Task.DestinationToken) )
		alert("Task.DestinationToken: call constuctor with new keyword");	

	this.m_token = in_token;
	this.m_originX = this.m_token.m_lastX;
	this.m_originY = this.m_token.m_lastY;
	this.m_sizeX = this.m_token.m_lastSizeX;
	this.m_sizeY = this.m_token.m_lastSizeY;

	this.m_countdown = 1.0;
}

Task.DestinationToken.prototype.Draw = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	this.m_countdown -= in_timeDelta;
	if (this.m_countdown < 0)
	{
		return false;
	}

	var posX = ((_originX + (_sizeX * 0.5)) * (1.0 - this.m_countdown)) + (this.m_originX * (this.m_countdown));
	var posY = ((_originY + (_sizeY * 0.5)) * (1.0 - this.m_countdown)) + (this.m_originY * (this.m_countdown));
	var sizeX = this.m_sizeX * this.m_countdown;
	var sizeY = this.m_sizeY * this.m_countdown;

	this.m_token.Draw(in_framework, in_timeDelta, posX, posY, sizeX, sizeY);

	return true;
}

Task.DestinationToken.FactoryRaw = function(in_token, in_targetX, in_targetY)
{
	return new Task.DestinationToken(in_token, in_targetX, in_targetY);
}
