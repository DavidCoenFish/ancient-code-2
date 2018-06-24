/**
https://en.wikipedia.org/wiki/ISO_639:e
 * @private
 * @constructor
 * @struct
 */
LQ.DataStoreMockTranslation = function()
{
	/** @dict @type {!Object.<!string, !Object.<!string, !string > >} */
	this.m_data = {
		//e_failGameIDNotFound : 1
		"Error.1" : {
			"eng" : "GameID Not Found"
			},
		//e_failGameIDAlreadyExists : 2
		"Error.2" : {
			"eng" : "GameID Already Exists"
			},
		//e_failKeyNotFound : 3
		"Error.3" : {
			"eng" : "Key Not Found"
			},
		//e_failKeyAlreadyExists : 4
		"Error.4" : {
			"eng" : "Key Already Exists"
			},

	};
	return;
}

/**
 * @return {!LQ.DataStoreMockTranslation}
 */
LQ.DataStoreMockTranslation.Factory = function()
{
	return new LQ.DataStoreMockTranslation();
}

/**
 * GetData
 * @param {!string} in_language
 * @param {!string} in_key
 * @return {!string}
 */
LQ.DataStoreMockTranslation.prototype.GetData = function(in_language, in_key)
{
	if (in_key in this.m_data)
	{
		/** @type {!Object.<!string, !string >} */
		var item = this.m_data[in_key];
		if (in_language in item)
		{
			return item[in_language];
		}
	}

	return "<no translation for key:" + in_key + " in language:" + in_language + ">";
};
