/**
 * @private
 * @constructor
 * @struct
 * @param {!LQ.BusinessLogicResult.s_result} in_result
 * @param {!string} in_data
 */
LQ.BusinessLogicResult = function(in_result, in_data)
{
	this.m_result = in_result;
	this.m_data = in_data;

	return;
}

/**
 * @param {!string} in_data
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogicResult.FactorySuccess = function(in_data)
{
	return new LQ.BusinessLogicResult(LQ.BusinessLogicResult.s_result.e_success, in_data);
}

/**
 * @param {!string} in_data
 * @return {!LQ.BusinessLogicResult}
 */
LQ.BusinessLogicResult.FactoryError = function(in_data)
{
	return new LQ.BusinessLogicResult(LQ.BusinessLogicResult.s_result.e_internalServerError, in_data);
}

/**
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 * @const
 * @enum {number}
 */
LQ.BusinessLogicResult.s_result = 
{
	e_success : 200,
	e_internalServerError : 500
};

