/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	result &= (true == DSC.Math.AlmostZero(0.0));
	result &= (false == DSC.Math.AlmostZero(10.0));
	result &= (false == DSC.Math.AlmostZero(-10.0));
	result &= (true == DSC.Math.AlmostZero(0.0, 0.001));
	result &= (true == DSC.Math.AlmostZero(0.001, 0.001));
	result &= (true == DSC.Math.AlmostZero(-0.001, 0.001));
	result &= (false == DSC.Math.AlmostZero(0.1, 0.001));
	result &= (false == DSC.Math.AlmostZero(-0.1, 0.001));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To test value is almost zero"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	result &= (true == DSC.Math.AlmostEqual(0.0, 0.0));
	result &= (true == DSC.Math.AlmostEqual(5.0, 5.0));
	result &= (false == DSC.Math.AlmostEqual(-5.0, 5.0));
	result &= (true == DSC.Math.AlmostEqual(0.0, 0.0001, 0.001));
	result &= (true == DSC.Math.AlmostEqual(5.0, 5.0001, 0.001));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To test value is almost equal"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	result &= (true == DSC.Math.AlmostEqual(10.0, DSC.Math.Lerp(10.0, 20.0, 0.0)));
	result &= (true == DSC.Math.AlmostEqual(15.0, DSC.Math.Lerp(10.0, 20.0, 0.5)));
	result &= (true == DSC.Math.AlmostEqual(20.0, DSC.Math.Lerp(10.0, 20.0, 1.0)));
	result &= (true == DSC.Math.AlmostEqual(-5.0, DSC.Math.Lerp(10.0, -20.0, 0.5)));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Lerp a value"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	result &= (true == DSC.Math.AlmostEqual(10.0, DSC.Math.Clamp(10.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(10.0, DSC.Math.Clamp(0.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(15.0, DSC.Math.Clamp(15.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(20.0, DSC.Math.Clamp(20.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(20.0, DSC.Math.Clamp(30.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(0.0, DSC.Math.Clamp(0.0, -10.0, 10.0)));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Clamp a value"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	result &= (true == DSC.Math.AlmostEqual(10.0, DSC.Math.Wrap(10.0, 10.0, 20.0)));
	//console.info(""  + DSC.Math.Wrap(10.0, 10.0, 20.0) + " " + result);
	result &= (true == DSC.Math.AlmostEqual(15.0, DSC.Math.Wrap(5.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(15.0, DSC.Math.Wrap(15.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(15.0, DSC.Math.Wrap(25.0, 10.0, 20.0)));
	result &= (true == DSC.Math.AlmostEqual(-15.0, DSC.Math.Wrap(-25.0, -20.0, -10.0)));
	result &= (true == DSC.Math.AlmostEqual(-15.0, DSC.Math.Wrap(-15.0, -20.0, -10.0)));
	result &= (true == DSC.Math.AlmostEqual(-15.0, DSC.Math.Wrap(-5.0, -20.0, -10.0)));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Wrap a value"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	result &= (true == DSC.Math.AlmostEqual(0.0, DSC.Math.Smooth(0.0)));
	result &= (true == DSC.Math.AlmostEqual(1.0, DSC.Math.Smooth(1.0)));
	result &= (true == (DSC.Math.Smooth(0.0) < DSC.Math.Smooth(0.1)));
	result &= (true == (DSC.Math.Smooth(0.9) < DSC.Math.Smooth(1.0)));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To Smooth a value"
	};
});
