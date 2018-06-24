//common.js

function CommonDrawPath(in_context, in_pixelOrigin, in_pixelSize, in_arrayArrayData, in_xScale)
{
	in_context.beginPath();

	for (var index = 0; index < in_arrayArrayData.length; ++index)
	{
		var subArray = in_arrayArrayData[index];
		
		in_context.moveTo(in_pixelOrigin.m_x + (subArray[0] * in_pixelSize.m_x), in_pixelOrigin.m_y + (subArray[1] * in_pixelSize.m_y));
		for (var subIndex = 2; subIndex < subArray.length; subIndex += 2)
		{
			in_context.lineTo(in_pixelOrigin.m_x + (subArray[subIndex] * in_pixelSize.m_x), in_pixelOrigin.m_y + (subArray[subIndex + 1] * in_pixelSize.m_y));	
		}
	}
}

function CommonDrawPathSimple(in_context, in_arrayArrayData)
{
	in_context.beginPath();

	for (var index = 0; index < in_arrayArrayData.length; ++index)
	{
		var subArray = in_arrayArrayData[index];
		if (subArray)
		{
			in_context.moveTo(subArray[0], subArray[1]);
			for (var subIndex = 2; subIndex < subArray.length; subIndex += 2)
			{
				in_context.lineTo(subArray[subIndex], subArray[subIndex + 1]);	
			}
		}
	}
}