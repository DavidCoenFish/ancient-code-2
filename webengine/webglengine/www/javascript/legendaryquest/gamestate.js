LegendaryQuest.GameState = function(_character)
{
	if ( !(this instanceof LegendaryQuest.GameState) )
		alert("LegendaryQuest.GameState: call constuctor with new keyword");	

	this.m_character = (undefined == _character) ? LegendaryQuest.GameState.Character.Factory() : _character;

	return;
}

LegendaryQuest.GameState.prototype.NewCharacter = function()
{
	this.m_character = LegendaryQuest.GameState.Character.Factory();
}

LegendaryQuest.GameState.FactoryRaw = function(_character)
{
	return new LegendaryQuest.GameState(_character);
}
