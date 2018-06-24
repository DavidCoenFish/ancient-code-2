/** 
 * @type {!Array<!function():!{"Result":!boolean, "Name":!string}>}
 */
var s_arrayUnitTest = [];
window['s_arrayUnitTest'] = s_arrayUnitTest;

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!DSC.DNGValue.<null, number>} */
	var Implementation = DSC.DNGValue.Factory(10.3);
	/** @type {!DSC.DNGNode.<null, number, null>} */
	var Node = DSC.DNGNode.Factory(Implementation);

	result &= (undefined !== Node);
	result &= (null !== Node);
	result &= (10.3 === Node.GetValue());

	Node.SetValue(7.4);
	result &= (7.4 === Node.GetValue());

	return {
		"Result" : result,
		"Name" : "Client should be able to create DNG Node value"
	};
});

/** @type {!function(!Array.<null|(DSC.DNGOutputRecord.<number>)>, (null|number)) : !number} */
var Sum = function(in_arrayInput, in_oldValue)
{
	/** @type {!number} */
	var total = 0.0;
	/** @type {!number} */
	var index = 0;
	for (index = 0; index < in_arrayInput.length; ++index)
	{
		/** @type {?(DSC.DNGOutputRecord.<!number>)} */
		var input = in_arrayInput[index];
		if (null === input)
		{
			continue;
		}
		total += input.GetValue();
	}
	return total;
}

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!DSC.DNGValue.<null, number>} */
	var ImplementationA = DSC.DNGValue.Factory(10.3);
	/** @type {!DSC.DNGNode.<null, number, null>} */
	var NodeA = DSC.DNGNode.Factory(ImplementationA);

	/** @type {!DSC.DNGValue.<null, number>} */
	var ImplementationB = DSC.DNGValue.Factory(11.4);
	/** @type {!DSC.DNGNode.<null, number, null>} */
	var NodeB = DSC.DNGNode.Factory(ImplementationB);

	//{!DSC.DNGCalculate.<!number, !number>}
	/** @type {?} */
	var ImplementationC = DSC.DNGCalculate.Factory(Sum);
	/** @type {!DSC.DNGNode.<!number, !number, null>} */
	var NodeC = DSC.DNGNode.Factory(ImplementationC);

	NodeC.AddInput(NodeA);
	NodeC.AddInput(NodeB);

	result &= (undefined !== NodeC);
	result &= (null !== NodeC);
	result &= (true === DSC.Math.AlmostEqual(21.7, NodeC.GetValue()));

	NodeB.SetValue(0.1);
	result &= (true === DSC.Math.AlmostEqual(10.4, NodeC.GetValue()));
	result &= (2 === NodeC.GetInputCount());
	result &= (0 === NodeC.GetOutputCount());
	result &= (0 === NodeA.GetInputCount());
	result &= (1 === NodeA.GetOutputCount());
	result &= (0 === NodeB.GetInputCount());
	result &= (1 === NodeB.GetOutputCount());

	NodeC.RemoveInput(NodeA);
	result &= (true === DSC.Math.AlmostEqual(0.1, NodeC.GetValue()));
	result &= (1 === NodeC.GetInputCount());
	result &= (0 === NodeC.GetOutputCount());
	result &= (0 === NodeA.GetInputCount());
	result &= (0 === NodeA.GetOutputCount());
	result &= (0 === NodeB.GetInputCount());
	result &= (1 === NodeB.GetOutputCount());

	NodeC.ClearInput();
	result &= (true === DSC.Math.AlmostEqual(0.0, NodeC.GetValue()));
	result &= (0 === NodeC.GetInputCount());
	result &= (0 === NodeC.GetOutputCount());
	result &= (0 === NodeA.GetInputCount());
	result &= (0 === NodeA.GetOutputCount());
	result &= (0 === NodeB.GetInputCount());
	result &= (0 === NodeB.GetOutputCount());

	return {
		"Result" : result,
		"Name" : "Client should be able to create DNG Node calculate"
	};
});

s_arrayUnitTest.push(function()
{
	/** @type {!boolean} */
	var result = true;

	/** @type {!DSC.DNGValue.<null, number>} */
	var ImplementationA = DSC.DNGValue.Factory(10.3);
	/** @type {!DSC.DNGNode.<null, number, null>} */
	var NodeA = DSC.DNGNode.Factory(ImplementationA);

	/** @type {!DSC.DNGValue.<null, number>} */
	var ImplementationB = DSC.DNGValue.Factory(11.4);
	/** @type {!DSC.DNGNode.<null, number, null>} */
	var NodeB = DSC.DNGNode.Factory(ImplementationB);

	//{!DSC.DNGCalculate.<!number, !number>}
	/** @type {?} */
	var ImplementationC = DSC.DNGCalculate.Factory(Sum);
	/** @type {!DSC.DNGNode.<!number, !number, null>} */
	var NodeC = DSC.DNGNode.Factory(ImplementationC);

	NodeC.SetInput(NodeA, 0);
	NodeC.SetInput(NodeB, 1);

	result &= (2 === NodeC.GetInputCount());
	result &= (0 === NodeC.GetOutputCount());

	result &= (NodeA === NodeC.GetInput(0));
	result &= (NodeB === NodeC.GetInput(1));

	result &= (0 === NodeA.GetInputCount());
	result &= (1 === NodeA.GetOutputCount());
	result &= (NodeC === NodeA.GetOutput(0));

	result &= (0 === NodeB.GetInputCount());
	result &= (1 === NodeB.GetOutputCount());
	result &= (NodeC === NodeB.GetOutput(0));

	return {
		"Result" : result,
		"Name" : "Client should be able to set and get node input"
	};
});

