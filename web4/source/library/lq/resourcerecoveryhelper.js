/**
 * @private
 * @constructor
 * @struct
 * @param {!number} in_maxAmount
 * @param {!number} in_recoveryTimeMilliseconds
 * @param {!number} in_currentAmount
 * @param {null|Date} in_currentAmountTimeStampOrNull the timestamp of the current amount
 */
LQ.ResourceRecoveryHelper = function(
	in_maxAmount,
	in_recoveryTimeMilliseconds,
	in_currentAmount,
	in_currentAmountTimeStampOrNull
	)
{
	/** @type {!number} */
	this.m_maxAmount = in_maxAmount;
	/** @type {!number} */
	this.m_recoveryTimeMilliseconds = in_recoveryTimeMilliseconds;
	/** @type {!number} */
	this.m_currentAmount = in_currentAmount;
	/** @type {null|Date} */
	this.m_currentAmountTimeStampOrNull = in_currentAmountTimeStampOrNull;
}

/**
 * @param {!number} in_maxAmount
 * @param {!number} in_recoveryTimeMilliseconds
 * @param {!number} in_currentAmount
 * @param {null|Date} in_currentAmountTimeStampOrNull
 * @return {!LQ.ResourceRecoveryHelper}
 */
LQ.ResourceRecoveryHelper.Factory = function(
	in_maxAmount,
	in_recoveryTimeMilliseconds,
	in_currentAmount,
	in_currentAmountTimeStampOrNull
	)
{
	return new LQ.ResourceRecoveryHelper(
		in_maxAmount,
		in_recoveryTimeMilliseconds,
		in_currentAmount,
		in_currentAmountTimeStampOrNull
		);
}

/**
 * @param {!number} in_maxAmount
 * @param {!number} in_recoveryTimeMilliseconds
 * @param {!number} in_currentAmount
 * @param {null|Date} in_currentAmountTimeStampOrNull
 * @param {!Date} in_nowDate
 * @return {!LQ.ResourceRecoveryHelper}
 */
LQ.ResourceRecoveryHelper.FactoryCurrent = function(
	in_maxAmount,
	in_recoveryTimeMilliseconds,
	in_currentAmount,
	in_currentAmountTimeStampOrNull,
	in_nowDate
	)
{
	/** @type {!LQ.ResourceRecoveryHelper} */
	var Resource = LQ.ResourceRecoveryHelper.Factory(
		in_maxAmount,
		in_recoveryTimeMilliseconds,
		in_currentAmount,
		in_currentAmountTimeStampOrNull
		);
	Resource.Evalue(in_nowDate);
	return Resource;
}

/**
 * @param {!string} in_dateStringOrEmpty
 * @return {null|Date}
 */
LQ.ResourceRecoveryHelper.StringToDateOrNull = function(in_dateStringOrEmpty)
{
	if ("" === in_dateStringOrEmpty)
	{
		return null;
	}
	return new Date(in_dateStringOrEmpty);
}

/**
 * @param {null|Date} in_dateOrNull
 * @return {!string} 
 */
LQ.ResourceRecoveryHelper.DateOrNullToString = function(in_dateOrNull)
{
	if (null === in_dateOrNull)
	{
		return "";
	}
	return in_dateOrNull.toISOString();
}

/**
 * @param {!Date} in_currentDate
 */
LQ.ResourceRecoveryHelper.prototype.Evalue = function(in_currentDate)
{
	if (null === this.m_currentAmountTimeStampOrNull)
	{
		if (this.m_currentAmount != this.m_maxAmount)
		{
			this.m_currentAmountTimeStampOrNull = new Date(in_currentDate);
		}
	}
	else
	{
		/** @type {!number} */
		var millisecondsPastCurrentTime = Math.max(0, in_currentDate.valueOf() - this.m_currentAmountTimeStampOrNull.valueOf());
		/** @type {!number} */
		var increment = Math.floor(millisecondsPastCurrentTime / this.m_recoveryTimeMilliseconds);

		this.m_currentAmount += increment;
		
		if (this.m_maxAmount <= this.m_currentAmount) //resource has recovered
		{
			this.m_currentAmount = this.m_maxAmount;
			this.m_currentAmountTimeStampOrNull = null;
		}
		else if (0 != increment) //update timestamp on increment
		{
			/** @type {!number} */
			var newTimeStampMilliseconds = this.m_currentAmountTimeStampOrNull.valueOf() + (increment * this.m_recoveryTimeMilliseconds);
			this.m_currentAmountTimeStampOrNull = new Date(newTimeStampMilliseconds);
		}
	}
	return;
}

/**
 * @param {!Date} in_currentDate
 * @return {!number}
 */
LQ.ResourceRecoveryHelper.prototype.GetRecoveryMilliseconds = function(in_currentDate)
{
	this.Evalue(in_currentDate);

	if (null === this.m_currentAmountTimeStampOrNull)
	{
		return 0;
	}

	/** @type {!number} */
	var fullRecoveryMilliseconds = this.m_currentAmountTimeStampOrNull.valueOf() + (this.m_recoveryTimeMilliseconds * (this.m_maxAmount - this.m_currentAmount));
	/** @type {!number} */
	var millisecondsPastCurrentTime = Math.max(0, fullRecoveryMilliseconds - in_currentDate.valueOf());
	return millisecondsPastCurrentTime;
}
