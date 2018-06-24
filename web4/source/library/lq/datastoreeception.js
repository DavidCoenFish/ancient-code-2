/**
 * @private
 * @constructor
 * @struct
 * @param {!LQ.DataStoreException.s_enum} in_enum
 */
LQ.DataStoreException = function(in_enum)
{
	this.m_enum = in_enum;

	return;
}

/**
 * @param {!LQ.DataStoreException.s_enum} in_enum
 * @return {!LQ.DataStoreException}
 */
LQ.DataStoreException.Factory = function(in_enum)
{
	return new LQ.DataStoreException(in_enum);
}

/**
 * @const
 * @enum {number}
 */
LQ.DataStoreException.s_enum = 
{
	e_success : 0,
	e_failGameIDNotFound : 1,
	e_failGameIDAlreadyExists : 2,
	e_failGameKeyNotFound : 3,
	e_failGameKeyAlreadyExists : 4,
	e_failApplicationKeyNotFound : 5,
};

