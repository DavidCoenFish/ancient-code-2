/**
 * @record
 */
LQ.DataStoreRecord = function(){}

/**
 * CreateGame
 * @param {!string} in_gameId
 * @throws {LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.CreateGame = function(in_gameId){};

/**
 * RemoveGame
 * @param {!string} in_gameId
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.RemoveGame = function(in_gameId){};

/**
 * CreateGameData
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @param {!string} in_data
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.CreateGameData = function(in_gameId, in_key, in_data){};

/**
 * GetGameData
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @param {null|LQ.DataStoreResult} in_prevOrNull
 * @return {!LQ.DataStoreResult}
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.GetGameData = function(in_gameId, in_key, in_prevOrNull){};

/**
 * SetGameData (return false on set not happening due to incorrect change id)
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @param {!string} in_data
 * @param {!number} in_changeID
 * @return {!boolean}
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.SetGameData = function(in_gameId, in_key, in_data, in_changeID){};

/**
 * RemoveGameData
 * @param {!string} in_gameId
 * @param {!string} in_key
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.RemoveGameData = function(in_gameId, in_key){};

/**
 * GetApplicationData (return string)
 * @param {!string} in_key
 * @return {!string}
 * @throws {!LQ.DataStoreException}
 */
LQ.DataStoreRecord.prototype.GetApplicationData = function(in_key){};

/**
 * GetTranslatedString (return string, empty string if translation not found, no throw)
 * @param {!string} in_language
 * @param {!string} in_key
 * @return {!string}
 */
LQ.DataStoreRecord.prototype.GetTranslatedString = function(in_language, in_key){};

