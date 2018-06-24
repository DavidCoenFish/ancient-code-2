DSC.Framework.Asset.Font.LetterData = function(
	in_width,
	_drawElementStart,
	_drawElementCount,
	_newLine
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Font.LetterData) )
		alert("DSC.Framework.Asset.Font.LetterData: call constuctor with new keyword");

	this.m_width = in_width;
	this.m_drawElementStart = (undefined == _drawElementStart) ? 0 : _drawElementStart;
	this.m_drawElementCount = (undefined == _drawElementCount) ? 0 : _drawElementCount;
	this.m_newLine = (undefined == _newLine) ? false : _newLine;

	return;
}

DSC.Framework.Asset.Font.LetterData.FactoryRaw = function(
	in_width,
	_drawElementStart,
	_drawElementCount,
	_newLine
	)
{
	return new DSC.Framework.Asset.Font.LetterData(
		in_width,
		_drawElementStart,
		_drawElementCount,
		_newLine
		);
}
