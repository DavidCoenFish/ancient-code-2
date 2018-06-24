/**
 * @private
 * @constructor
 * @struct
 * @param {!string} in_data
 * @param {!number} in_changeID
 */
LQ.DataStoreMockData = function(in_data, in_changeID)
{
	this.m_data = in_data;
	this.m_changeID = in_changeID;

	return;
}

/**
 * @param {!string} in_data
 * @param {!number} in_changeID
 * @return {!LQ.DataStoreMockData}
 */
LQ.DataStoreMockData.Factory = function(in_data, in_changeID)
{
	return new LQ.DataStoreMockData(in_data, in_changeID);
}

