/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @dict */
	var test0 = {
		"alongmembername" : 57,
		"anotherlongmembername" : {
			"SubOne" : 1,
			"subTwo" : false
			},
		"andALastMember" : [ 2, 3, 4 ]
	};

	/** @type {!string} */
	var stringJson = JSON.stringify(test0);

	/** @dict */
	var test1 = JSON.parse(stringJson);

	result &= (true == ("alongmembername" in test1));
	result &= (true == ("anotherlongmembername" in test1));
	result &= (true == ("andALastMember" in test1));
	result &= (test0["alongmembername"] === test1["alongmembername"]);
	result &= (test0["anotherlongmembername"]["SubOne"] === test1["anotherlongmembername"]["SubOne"]);
	result &= (test0["anotherlongmembername"]["subTwo"] === test1["anotherlongmembername"]["subTwo"]);

	return {
		"Result" : result,
		"Name" : "Should be able to use JSON to go from dict to string to dict"
	};
});

