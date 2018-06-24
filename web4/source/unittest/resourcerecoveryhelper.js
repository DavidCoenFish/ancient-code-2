/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!LQ.ResourceRecoveryHelper} */
	var Resource0 = LQ.ResourceRecoveryHelper.Factory(3, 60 * 60 * 1000, 2, new Date("2016-05-21T01:00:00.000Z"));
	result &= (null !== Resource0);

	/** @type {!LQ.ResourceRecoveryHelper} */
	var Resource1 = LQ.ResourceRecoveryHelper.Factory(3, 60 * 60 * 1000, 1, null);
	result &= (null !== Resource1);
	
 	return {
		"Result" : result,
		"Name" : "Client Should Be Able To create a resource recovery helper"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!LQ.ResourceRecoveryHelper} */
	var resource0 = LQ.ResourceRecoveryHelper.Factory(3, 60 * 60 * 1000, 0, new Date("2016-05-21T01:00:00.000Z"));

 	/** @type {!Date} */
	var testNow0 = new Date("2016-05-21T02:00:00.000Z");
	/** @type {!number} */
	var remaning0 = resource0.GetRecoveryMilliseconds(testNow0);
	result &= (1 === resource0.m_currentAmount);
	result &= (2 * 60 * 60 * 1000 === remaning0);

	/** @type {!Date} */
	var testNow1 = new Date("2016-05-21T02:30:00.000Z");
	/** @type {!number} */
	var remaning1 = resource0.GetRecoveryMilliseconds(testNow1);
	result &= (1 === resource0.m_currentAmount);
	result &= (1.5 * 60 * 60 * 1000 === remaning1);

	/** @type {!Date} */
	var testNow2 = new Date("2016-05-21T04:00:00.000Z");
	/** @type {!number} */
	var remaning2 = resource0.GetRecoveryMilliseconds(testNow2);
	result &= (3 === resource0.m_currentAmount);
	result &= (0 === remaning2);

	/** @type {!Date} */
	var testNow3 = new Date("2016-05-21T05:00:00.000Z");
	/** @type {!number} */
	var remaning3 = resource0.GetRecoveryMilliseconds(testNow3);
	result &= (3 === resource0.m_currentAmount);
	result &= (0 === remaning3);

 	return {
		"Result" : result,
		"Name" : "Client Should Be Able to manipulate a resource recovery helper"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!Date} */
	var date1 = new Date();

	/** @type {!string} */
	var dateString0 = LQ.ResourceRecoveryHelper.DateOrNullToString(null);
	result &= ("" === dateString0);
	/** @type {!string} */
	var dateString1 = LQ.ResourceRecoveryHelper.DateOrNullToString(date1);
	result &= ("" !== dateString1);

	/** @type {null|Date} */
	var dateResult0 = LQ.ResourceRecoveryHelper.StringToDateOrNull(dateString0);
	result &= (null === dateResult0);
	/** @type {null|Date} */
	var dateResult1 = LQ.ResourceRecoveryHelper.StringToDateOrNull(dateString1);
	result &= (null !== dateResult1);

	/** @type {!string} */
	var dateStringResult0 = LQ.ResourceRecoveryHelper.DateOrNullToString(dateResult0);
	result &= (dateString0 === dateStringResult0);
	/** @type {!string} */
	var dateStringResult1 = LQ.ResourceRecoveryHelper.DateOrNullToString(dateResult1);
	result &= (dateString1 === dateStringResult1);

 	return {
		"Result" : result,
		"Name" : "Client Should Be Able To convert between date and string"
	};
});



