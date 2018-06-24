/**
 * @private
 * @constructor
 * @param {!number} in_width
 * @param {!number=} _drawElementStart
 * @param {!number=} _drawElementCount
 * @param {!boolean=} _newLine
 */
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


/**
 * @param {!number} in_width
 * @param {!number=} _drawElementStart
 * @param {!number=} _drawElementCount
 * @param {!boolean=} _newLine
 * @return {!DSC.Framework.Asset.Font.LetterData}
 */
DSC.Framework.Asset.Font.LetterData.Factory = function(
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
