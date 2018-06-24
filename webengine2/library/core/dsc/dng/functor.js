/**
 * Collection of common functors
 * @const
 * @unrestricted
 */
DSC.DNG.Functor = {}
DSC.DNG['Functor'] = DSC.DNG.Functor;

/**
 * export
 * @template T
 * @param {!string} in_name
 * @return {!function(!Array.<DSC.DNG.Node>, !T) : !string} 
 * nosideeffects
 */
DSC.DNG.Functor.MakeDefaultValueAsString = function(in_name)
{
	var resultFunctor = function(in_arrayNodes, in_value)
	{
		return in_name + ": " +  in_value;
	}
	return resultFunctor;
}
DSC.DNG.Functor['MakeDefaultValueAsString'] = DSC.DNG.Functor.MakeDefaultValueAsString;

/**
 * export
 * @template T
 * @param {!string} in_name
 * @return {!function(!Array.<DSC.DNG.Node>, !T) : !string} 
 * nosideeffects
 */
DSC.DNG.Functor.MakeDefaultCalculateAsString = function(in_name)
{
	var resultFunctor = function(in_arrayNodes, in_value)
	{
		var resultString = in_name  + ": (";

		in_arrayNodes.forEach( function(node)
		{
			resultString += node.AsString();
			if (0 < index)
				resultString += ", ";
		});

		resultString += ")";
		return resultString;
	}
	return resultFunctor;
}
DSC.DNG.Functor['MakeDefaultCalculateAsString'] = DSC.DNG.Functor.MakeDefaultCalculateAsString;

/**
 * export
 * @template T
 * @param {!Array.<DSC.DNG.Node>} in_arrayNode
 * @param {?T} _value
 * @return {!T}
 * nosideeffects
 */
DSC.DNG.Functor.CalculateSumNumeric = function(in_arrayNode, _value)
{
	var value = 0;
	in_arrayNode.forEach( function(node)
	{
		if (undefined != node)
		{
			value += node.GetValue()
		}
	});
	return value;
}
DSC.DNG.Functor['CalculateSumNumeric'] = DSC.DNG.Functor.CalculateSumNumeric;

/**
 * @param {!Array.<DSC.DNG.Node>} in_arrayNode
 * @param {!DSC.Math.Matrix4Type=} _value
 * @return {!DSC.Math.Matrix4Type}
 */
DSC.DNG.Functor.PairMultiplyMatrix4Matrix4 = function(in_arrayNode, _value)
{
	var lhs = in_arrayNode[0];
	var rhs = in_arrayNode[1];
	_value = DSC.Math.Matrix4.Multiply(lhs.GetValue(), rhs.GetValue(), _value);
	return _value;
}
DSC.DNG.Functor['PairMultiplyMatrix4Matrix4'] = DSC.DNG.Functor.PairMultiplyMatrix4Matrix4;

/**
 * @param {!Array.<DSC.DNG.Node>} in_arrayNode
 * @param {!DSC.Math.Matrix4Type=} _value
 * @return {!DSC.Math.Matrix4Type}
 */
DSC.DNG.Functor.Matrix4Invert = function(in_arrayNode, _value)
{
	var lhs = in_arrayNode[0];
	_value = DSC.Math.Matrix4.Inverse(lhs.GetValue(), _value);
	return _value;
}
DSC.DNG.Functor['Matrix4Invert'] = DSC.DNG.Functor.Matrix4Invert;
