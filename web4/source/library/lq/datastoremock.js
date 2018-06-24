/**
 * @private
 * @constructor
 * @struct
 */
LQ.DataStoreMock = function()
{
	/** @dict @type {!Object.<!string, !LQ.DataStoreMockGame>} */
	this.m_data = {};

	/** @type {!LQ.DataStoreMockTranslation} */
	this.m_translation = LQ.DataStoreMockTranslation.Factory();

	/** @type {!LQ.DataStoreMockApplication} */
	this.m_application = LQ.DataStoreMockApplication.Factory();

	return;
}

/**
 * @return {!LQ.DataStoreMock}
 */
LQ.DataStoreMock.Factory = function()
{
	return new LQ.DataStoreMock();
}

/**
 * CreateGame
 * @param {!string} in_gameId
 * @throws {LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.CreateGame = function(in_gameId)
{
	if (true === (in_gameId in this.m_data))
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameIDAlreadyExists);
	}

	this.m_data[in_gameId] = LQ.DataStoreMockGame.Factory();
	return;
};

/**
 * RemoveGame
 * @param {!string} in_gameId
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.RemoveGame = function(in_gameId)
{
	if (false === (in_gameId in this.m_data))
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameIDNotFound);
	}
	delete this.m_data[in_gameId];
	return;
}

/**
 * CreateGameData
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @param {!string} in_data
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.CreateGameData = function(in_gameId, in_key, in_data)
{
	/** @type {undefined|LQ.DataStoreMockGame} */
	var game = this.m_data[in_gameId];
	if (undefined === game)
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameIDNotFound);
	}
	game.CreateData(in_key, in_data);
	return;
}

/**
 * GetGameData
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @param {null|LQ.DataStoreResult} in_prevOrNull
 * @return {!LQ.DataStoreResult}
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.GetGameData = function(in_gameId, in_key, in_prevOrNull)
{
	/** @type {undefined|LQ.DataStoreMockGame} */
	var game = this.m_data[in_gameId];
	if (undefined === game)
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameIDNotFound);
	}

	return game.GetData(in_key, in_prevOrNull);
}

/**
 * SetGameData (return false on set not happening due to incorrect change id)
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @param {!string} in_data
 * @param {!number} in_changeID
 * @return {!boolean}
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.SetGameData = function(in_gameId, in_key, in_data, in_changeID)
{
	/** @type {undefined|LQ.DataStoreMockGame} */
	var game = this.m_data[in_gameId];
	if (undefined === game)
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameIDNotFound);
	}

	return game.SetData(in_key, in_data, in_changeID);
}

/**
 * RemoveGameData
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.RemoveGameData = function(in_gameId, in_key)
{
	/** @type {undefined|LQ.DataStoreMockGame} */
	var game = this.m_data[in_gameId];
	if (undefined === game)
	{
		throw LQ.DataStoreException.Factory(LQ.DataStoreException.s_enum.e_failGameIDNotFound);
	}

	game.RemoveData(in_key);
	return;
}

/**
 * GetApplicationData (return string)
 * @param {!string} in_key
 * @return {!string}
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreMock.prototype.GetApplicationData = function(in_key)
{
	return this.m_application.GetData(in_key);
}

/**
 * GetTranslatedString (return string, empty string if translation not found, no throw)
 * @param {!string} in_language
 * @param {!string} in_key
 * @return {!string}
 */
LQ.DataStoreMock.prototype.GetTranslatedString = function(in_language, in_key)
{
	return this.m_translation.GetData(in_language, in_key);
}

