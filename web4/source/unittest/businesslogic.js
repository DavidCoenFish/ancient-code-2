/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!LQ.DataStoreMock} */
	var dataSource = LQ.DataStoreMock.Factory();
	result &= (undefined !== dataSource);

	//https://www.guidgenerator.com/online-guid-generator.aspx
	/** @type {!string} */
	var gameId = "52C7325A-09C3-4214-9263-9EDDAC1BD5ED";
	/** @type {!string} */
	var language = "eng";

	/** @type {!LQ.BusinessLogicResult} */
	var response = LQ.BusinessLogicCreateGame.Run(gameId, language, dataSource);
	result &= (LQ.BusinessLogicResult.s_result.e_success == response.m_result);
	//alert(response.m_data);
	/** @type {!LQ.PresentationLayerDataGameStatus} */
	var gameStatus = /** @type {!LQ.PresentationLayerDataGameStatus} */(JSON.parse(response.m_data));
	result &= (true == ('money' in gameStatus));
	result &= (true == ('actions' in gameStatus));
	result &= (true != ('sanity' in gameStatus));

	//response = LQ.BusinessLogicGetActionData.Run(gameId, language, gameStatus['actions'][0], dataSource);
	//businesslogicgetactiondata

	response = LQ.BusinessLogicDestroyGame.Run(gameId, language, dataSource);
	result &= (LQ.BusinessLogicResult.s_result.e_success == response.m_result);
	
 	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Create a game"
	};
});



