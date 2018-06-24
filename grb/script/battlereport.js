// battlereport.js

function BattleReport()
{
	//DEBUG if ( !(this instanceof BattleReport) )
	//DEBUG {
	//DEBUG 	alert("BattleReport: call constuctor with new keyword");	
	//DEBUG }
	
	//expect data in form { "m_name" : "name", "m_value" : 1.0 }
	this.m_arrayCaused = [];
	this.m_arrayReceived = [];
}

BattleReport.prototype.AddCaused = function(in_name, in_value)
{
	for (var index = 0; index < this.m_arrayCaused.length; ++index)
	{
		if (in_name == this.m_arrayCaused[index].m_name)
		{
			this.m_arrayCaused[index].m_value += in_value;
			return;
		}
	}
	this.m_arrayCaused.push({"m_name" : in_name, "m_value" : in_value});
}

BattleReport.prototype.AddReceived = function(in_name, in_value)
{
	for (var index = 0; index < this.m_arrayReceived.length; ++index)
	{
		if (in_name == this.m_arrayReceived[index].m_name)
		{
			this.m_arrayReceived[index].m_value += in_value;
			return;
		}
	}
	this.m_arrayReceived.push({"m_name" : in_name, "m_value" : in_value});
}


BattleReport.prototype.BattleFinish = function()
{
	function SortData(in_lhs, in_rhs)
	{
		var amount = (in_lhs.m_value - in_rhs.m_value);
		if (amount < 0)
		{
			return 1;
		}
		if (0 < amount)
		{
			return -1;
		}
		return 0;
	}
	
	this.m_arrayCaused.sort(SortData);
	this.m_arrayReceived.sort(SortData);
}
