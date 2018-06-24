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
	var Data = 
	{
		"foo" : 10,
		"bar" : 20
	};
	/** @type {!Object<!string, !Object>} */
	var Overloaded = DSC.OverloadData(Data);
		
	result &= (undefined != Overloaded);
	result &= (undefined != Overloaded["foo"]);
	result &= (undefined != Overloaded["bar"]);
	result &= (10 == Overloaded["foo"]);
	result &= (20 == Overloaded["bar"]);

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Overload Data without optional param"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @dict */
	var Data = 
	{
		"foo" : 10,
		"bar" : 20
	};
	/** @dict */
	var Overload = 
	{
		"foo" : 30,
		"moo" : 40
	};
	/** @type {!Object<!string, !Object>} */
	var Overloaded = DSC.OverloadData(Data, Overload);

	result &= (undefined != Overloaded);
	result &= (undefined != Overloaded["foo"]);
	result &= (undefined != Overloaded["bar"]);
	result &= (undefined != Overloaded["moo"]);
	result &= (30 == Overloaded["foo"]);
	result &= (20 == Overloaded["bar"]);
	result &= (40 == Overloaded["moo"]);

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Overload Data"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @dict */
	var Data = 
	{
		"foo" : 10,
		"bar" : 20,
		"moo" : {
			"a" : 50,
			"b" : 60,
			"f" : 110
		},
		"goo" : {
			"c" : 90
		}
	};
	/** @dict */
	var Overload = 
	{
		"foo" : 30,
		"moo" : {
			"a" : 70,
			"b" : 80
		},
		"zoo" : {
			"d" : {
				"e" : 100
			}
		}
	};

	/** @type {!Object<!string, !Object>} */
	var Overloaded = DSC.OverloadData(Data, Overload);

	result &= (undefined != Overloaded);
	result &= (undefined != Overloaded["foo"]);
	result &= (undefined != Overloaded["bar"]);
	result &= (undefined != Overloaded["moo"]);
	result &= (undefined != Overloaded["goo"]);
	result &= (undefined != Overloaded["zoo"]);
	result &= (30 == Overloaded["foo"]);
	result &= (20 == Overloaded["bar"]);
	result &= (70 == Overloaded["moo"]["a"]);
	result &= (80 == Overloaded["moo"]["b"]);
	result &= (110 == Overloaded["moo"]["f"]);
	result &= (100 == Overloaded["zoo"]["d"]["e"]);

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Overload Data Recursivly"
	};
});
