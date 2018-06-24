//modifiercharacterslotdata.js

function ModifierCharacterSlotData(in_cost, in_costStrength, in_costIntellegence, in_arrayNodeData, in_actionData, in_flag, in_wiggitType, in_description)
{
	//DEBUG if ( !(this instanceof ModifierCharacterSlotData) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterSlotData: call constuctor with new keyword");	
	//DEBUG }

	this.m_cost = in_cost;
	this.m_costStrength = in_costStrength;
	this.m_costIntellegence = in_costIntellegence;
	this.m_arrayNodeData = in_arrayNodeData;
	this.m_actionData = in_actionData;
	this.m_flag = in_flag;
	this.m_wiggitType = in_wiggitType;
	this.m_description = in_description;
}

ModifierCharacterSlotData.prototype.GetInfoValue = function(in_key)
{
	if ("Cost" == in_key)
	{
		return this.m_cost;
	}
	if ("Str Cost" == in_key)
	{
		return this.m_costStrength;
	}
	if ("Int Cost" == in_key)
	{
		return this.m_costIntellegence;
	}
	
	for (var index = 0; index < this.m_arrayNodeData.length; ++index)
	{
		var nodeData = this.m_arrayNodeData[index];
		if (in_key == nodeData.m_namePrepend)
		{
			return nodeData.m_value;
		}
	}

	if (this.m_actionData)
	{
		if (in_key in this.m_actionData.m_data)
		{
			return this.m_actionData.m_data[in_key];
		}
	}
	
	
	return 0;
}

//-- END // End Concatinate, unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;
		
		//construction
		if (true == result)
		{
			var modifierCharacterSlotData1 = new ModifierCharacterSlotData(10.0, 2.0, 0.0, [], {}, 0);
			var modifierCharacterSlotData2 = new ModifierCharacterSlotData(20.0, 1.0, 2.0, [], {}, 0);

		
			result &= (10.0 == modifierCharacterSlotData1.m_cost);
			result &= (2.0 == modifierCharacterSlotData1.m_costStrength);
			result &= (0.0 == modifierCharacterSlotData1.m_costIntellegence);
			result &= (20.0 == modifierCharacterSlotData2.m_cost);
			result &= (1.0 == modifierCharacterSlotData2.m_costStrength);
			result &= (2.0 == modifierCharacterSlotData2.m_costIntellegence);
		}
				
		if (true != result)
		{
			return "Fail:ModifierCharacterSlotData";
		}
		return "Pass:ModifierCharacterSlotData";
	}
	
	g_arrayUnitTest.push(out_object);
}

