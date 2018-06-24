Task.GameStatePlayer = function(in_name)
{
	if ( !(this instanceof Task.GameStatePlayer) )
		alert("Task.GameStatePlayer: call constuctor with new keyword");	

	this.m_name = in_name;
	this.m_goalCount = 0;
	this.m_behindCount = 0;
}

Task.GameStatePlayer.prototype.GetScoreText = function()
{
	return "" + this.m_goalCount + " : " + this.m_behindCount + " : " + ((this.m_goalCount * 6) + this.m_behindCount);
}

Task.GameStatePlayer.FactoryRaw = function(in_name)
{
	return new Task.GameStatePlayer(in_name);
}

