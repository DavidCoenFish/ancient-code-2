/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!DSC.RandomSequence} */
	var randomSequence0 = DSC.RandomSequence.Factory(5);
	/** @type {!DSC.RandomSequence} */
	var randomSequence1 = DSC.RandomSequence.Factory(7);
	/** @type {!DSC.RandomSequence} */
	var randomSequence2 = DSC.RandomSequence.Factory(5);

	/** @type {!number} */
	var rangeMin = 50;
	/** @type {!number} */
	var rangeMax = -50;

	/** @dict */
	var frequencyMap = {};
	for (var index = 0; index < 1000; ++index)
	{
		/** @type {!number} */
		var result0 = randomSequence0.Random();
		/** @type {!number} */
		var result1 = Math.floor((randomSequence1.Random() * 100.0) - 50.0);
		rangeMin = Math.min(rangeMin, result1);
		rangeMax = Math.max(rangeMax, result1);
		/** @type {!string} */
		var key1 = result1.toString();
		if (key1 in frequencyMap)
		{
			frequencyMap[key1] += 1;
		}
		else
		{
			frequencyMap[key1] = 1;
		}

		/** @type {!number} */
		var result2 = randomSequence2.Random();

		result &= (result0 === result2);
	}
	result &= (-50 === rangeMin);
	result &= (49 === rangeMax);

	/** @type {!number} */
	var r = 100;
	/** @type {!number} */
	var n_r = 1000 / r;
	/** @type {!number} */
	var chiSquared = 0.0;
	for (var key in frequencyMap)
	{
		/** @type {!number} */
		var frequency = frequencyMap[key] - n_r;
		chiSquared += ((frequency * frequency) / n_r);
	}

	//PART C: According to Swdgewick: "The statistic should be within 2(r)^1/2 of r
	//This is valid if N is greater than about 10r"
	result &= (r - 2 * Math.sqrt(r) <= chiSquared);
	result &= (chiSquared <= (r + 2 * Math.sqrt(r)));

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To generate a repeatable sequence of numbers"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!DSC.RandomSequence} */
	var randomSequence0 = DSC.RandomSequence.Factory(5);
	/** @type {!DSC.RandomSequence} */
	var randomSequence1 = DSC.RandomSequence.Factory(5);

	/** @type {!Array.<!number>} */
	var array0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	/** @type {!Array.<!number>} */
	var array1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	/** @type {!Array.<!number>} */
	var array2 = randomSequence0.ShuffelArray(array0, null);
	/** @type {!Array.<!number>} */
	var array3 = randomSequence1.ShuffelArray(array1, null);

	for (var index = 0; index < array0.length; ++index)
	{
		result &= index === array0[index];
	}

	result &= array2.length === array3.length;
	if (true == result)
	{
		for (var index = 0; index < array0.length; ++index)
		{
			result &= array2[index] === array3[index];
		}
	}

	return {
		"Result" : result,
		"Name" : "Client Should Be Able To suffel a array of numbers"
	};
});

