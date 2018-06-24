/**
 * @private
 * @constructor
 * @struct
 */
LQ.DataStoreMockGame = function()
{
	/** @dict @type {!Object.<!string, !LQ.DataStoreMockData>} */
	this.m_data = {};

	return;
}

/**
 * @return {!LQ.DataStoreMockGame}
 */
LQ.DataStoreMockGame.Factory = function()
{
	return new LQ.DataStoreMockGame();
}

/**
 * CreateData
 * @param {!string} in_key
 * @param {!string} in_data
 */
LQ.DataStoreMockGame.prototype.CreateData = function(in_key, in_data)
{
	if (in_key in this.m_data)
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameKeyAlreadyExists);
	}

	/** @type {!LQ.DataStoreMockData} */
	var item = LQ.DataStoreMockData.Factory(in_data, 0);
	this.m_data[in_key] = item;
	return;
};

/**
 * GetData
 * @param {!string} in_key
 * @param {null|LQ.DataStoreResult} in_prevOrNull
 * @return {!LQ.DataStoreResult}
 */
LQ.DataStoreMockGame.prototype.GetData = function(in_key, in_prevOrNull)
{
	if (false === (in_key in this.m_data))
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameKeyNotFound);
	}

	/** @type {!LQ.DataStoreMockData} */
	var item = this.m_data[in_key];
	return LQ.DataStoreResult.Factory(item.m_data, item.m_changeID, in_prevOrNull);
};

/**
 * SetData
 * @param {!string} in_key
 * @param {!string} in_data
 * @param {!number} in_changeID
 * @return {!boolean}
 */
LQ.DataStoreMockGame.prototype.SetData = function(in_key, in_data, in_changeID)
{
	if (false === (in_key in this.m_data))
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameKeyNotFound);
	}

	/** @type {!LQ.DataStoreMockData} */
	var item = this.m_data[in_key];
	if (in_changeID !== item.m_changeID)
	{
		return false;
	}

	item.m_changeID += 1;
	item.m_data = in_data;
	return true;
};

/**
 * RemoveData
 * @param {!string} in_key
 */
LQ.DataStoreMockGame.prototype.RemoveData = function(in_key)
{
	if (false === (in_key in this.m_data))
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameKeyNotFound);
	}

	delete this.m_data[in_key];

	return;
};

