/**
 * @private
 * @constructor
 * @struct
 * @param {!string} in_data
 * @param {!number} in_changeID
 */
LQ.DataStoreResult = function(in_data, in_changeID)
{
	this.m_data = in_data;
	this.m_changeID = in_changeID;

	return;
}

/**
 * @param {!string} in_data
 * @param {!number} in_changeID
 * @param {null|LQ.DataStoreResult} in_prevOrNull
 * @return {!LQ.DataStoreResult}
 */
LQ.DataStoreResult.Factory = function(in_data, in_changeID, in_prevOrNull)
{
	if (null !== in_prevOrNull)
	{
		in_prevOrNull.m_data = in_data;
		in_prevOrNull.m_changeID = in_changeID;
		return in_prevOrNull;
	}
	return new LQ.DataStoreResult(in_data, in_changeID);
}
