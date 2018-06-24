/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	var dataSource = LQ.DataStoreMock.Factory();
	result &= (undefined !== dataSource);

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Create a mock data source"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!LQ.DataStoreMock} */
	var dataSource = LQ.DataStoreMock.Factory();
	result &= (undefined !== dataSource);

	/** @type {!string} */
	var user = "foo";

	dataSource.CreateGame(user);

	/** @type {!string} */
	var dataKey = "bar";
	/** @type {!string} */
	var data0 = "abc";

	dataSource.CreateGameData(user, dataKey, data0);

	/** @type {null|LQ.DataStoreResult} */
	var replyObject = null;
	replyObject = dataSource.GetGameData(user, dataKey, replyObject);
	result &= (null !== replyObject);
	result &= (data0 === replyObject.m_data);

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Create a game, set and get a value"
	};
});


var ExpectException = function(in_call)
{
	try
	{
		in_call();
	}
	catch (in_error)
	{
		return (in_error instanceof LQ.DataStoreException);
	}
	return false;
}

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!LQ.DataStoreMock} */
	var dataSource = LQ.DataStoreMock.Factory();
	result &= (undefined !== dataSource);

	/** @type {!string} */
	var user = "foo";

	/** @type {!string} */
	var dataKey = "bar";
	/** @type {!string} */
	var data0 = "abc";

	//////////////////////////////////////
	// without user
	//CreateGame
	//RemoveGame
	result &= ExpectException(function(){ dataSource.RemoveGame(user); });
	//CreateGameData
	result &= ExpectException(function(){ dataSource.CreateGameData(user, dataKey, data0); });
	//GetGameData
	var resultObject = null;
	result &= ExpectException(function(){ resultObject = dataSource.GetGameData(user, dataKey, null); });
	//SetGameData
	result &= ExpectException(function(){ dataSource.SetGameData(user, dataKey, data0, 0); });
	//RemoveGameData
	result &= ExpectException(function(){ dataSource.RemoveGameData(user, dataKey); });

	//create user
	dataSource.CreateGame(user);

	//////////////////////////////////////
	// with user, without data
	
	// duplicate CreateGame
	result &= ExpectException(function(){ dataSource.CreateGame(user); });
	//GetGameData
	result &= ExpectException(function(){ resultObject = dataSource.GetGameData(user, dataKey, resultObject); });
	//SetGameData
	result &= ExpectException(function(){ dataSource.SetGameData(user, dataKey, data0, 0); });
	//RemoveGameData
	result &= ExpectException(function(){ dataSource.RemoveGameData(user, dataKey); });
	
	//create data
	dataSource.CreateGameData(user, dataKey, data0);
	
	//////////////////////////////////////
	// with user, with data
	
	// duplicate CreateGameData
	result &= ExpectException(function(){ dataSource.CreateGameData(user, dataKey, data0); });
	
	//GetGameData
	resultObject = dataSource.GetGameData(user, dataKey, resultObject);
	result &= (null !== resultObject);
	//SetGameData wrong change id
	result &= (false == dataSource.SetGameData(user, dataKey, "blabblub", resultObject.m_changeID - 1));
	
	//RemoveGameData
	dataSource.RemoveGameData(user, dataKey);
	// duplicate RemoveGameData
	result &= ExpectException(function(){ dataSource.RemoveGameData(user, dataKey); });
	
	//RemoveGame
	dataSource.RemoveGame(user);
	
	//////////////////////////////////////
	// without user
	//CreateGame
	//RemoveGame
	result &= ExpectException(function(){ dataSource.RemoveGame(user); });
	//CreateGameData
	result &= ExpectException(function(){ dataSource.CreateGameData(user, dataKey, data0); });
	//GetGameData
	result &= ExpectException(function(){ resultObject = dataSource.GetGameData(user, dataKey, resultObject); });
	//SetGameData
	result &= ExpectException(function(){ dataSource.SetGameData(user, dataKey, data0, 0); });
	//RemoveGameData
	result &= ExpectException(function(){ dataSource.RemoveGameData(user, dataKey); });

	result &= ExpectException(function(){ dataSource.GetApplicationData("SomeTestKeyThatShouldn'tExist"); });

	return {
		"Result" : result,
		"Name" : "Client Should generate correct error messages"
	};
});


s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!LQ.DataStoreMock} */
	var dataSource = LQ.DataStoreMock.Factory();

	/** @type {!string} */
	var data = dataSource.GetApplicationData("MobList.1");
	result &= ("" !== data);
	var arrayData = JSON.parse(data);
	result &= (0 < arrayData.length);

	return {
		"Result" : result,
		"Name" : "Client Should be able to get app data from data source"
	};
});
