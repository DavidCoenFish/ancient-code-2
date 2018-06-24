// guigamebattleview.js

//just a view, no logic for changing zoom or offset, just displays what it is told
function GuiGameBattleView(in_pixelOrigin, in_pixelSize, in_pixelsPerMeter, in_meterOriginOffset, in_borderStyle)
{
	//DEBUG if ( !(this instanceof GuiGameBattleView) )
	//DEBUG {
	//DEBUG 	alert("GuiGameBattleView: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_pixelsPerMeter = in_pixelsPerMeter;
	this.m_meterOriginOffset = in_meterOriginOffset;
	this.m_borderStyle = in_borderStyle;
	this.m_arrayGuiBattle = [];
	
	this.m_arrayGuiGameCharacter = [];
}

GuiGameBattleView.prototype.TestPlayerDeployed = function(in_index)
{
	for (var index = 0; index < this.m_arrayGuiGameCharacter.length; ++index)
	{
		if (in_index == this.m_arrayGuiGameCharacter[index].m_key)
		{
			return true;
		}
	}
	return false;
}

GuiGameBattleView.prototype.ConvertPixelToMeterPos = function(in_pixel)
{
	return new Vector(
		(in_pixel.m_x / this.m_pixelsPerMeter.m_x) + this.m_meterOriginOffset.m_x,
		(in_pixel.m_y / this.m_pixelsPerMeter.m_y) + this.m_meterOriginOffset.m_y
		);
}

GuiGameBattleView.prototype.ConvertMeterToPixelPos = function(in_meter)
{ 
	return new Vector(
		(in_meter.m_x - this.m_meterOriginOffset.m_x) * this.m_pixelsPerMeter.m_x,
		(in_meter.m_y - this.m_meterOriginOffset.m_y) * this.m_pixelsPerMeter.m_y
		);
}

GuiGameBattleView.prototype.TickGuiBattle = function(in_timeDelta)
{	
	var newArrayGuiBattle = [];
	this.m_arrayGuiBattle.forEach(function(in_item)
	{ 
		if (true == in_item.Tick(in_timeDelta))
		{
			newArrayGuiBattle.push(in_item);
		}
	});
	this.m_arrayGuiBattle = newArrayGuiBattle;
}

GuiGameBattleView.prototype.Tick = function(in_timeDelta)
{
	this.m_arrayGuiGameCharacter.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });
}

GuiGameBattleView.prototype.Draw = function(in_context, in_canvas)
{
	function SortData(in_lhs, in_rhs)
	{
		var amount = (in_lhs.m_pixelOrigin.m_y - in_rhs.m_pixelOrigin.m_y);
		if (amount < 0)
		{
			return -1;
		}
		if (0 < amount)
		{
			return 1;
		}
		return 0;
	}
	
	this.m_arrayGuiGameCharacter.sort(SortData);
	this.m_arrayGuiGameCharacter.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	
	var self = this;
	this.m_arrayGuiBattle.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas, self); } });
	
	if (this.m_borderStyle)
	{
		in_context.strokeStyle = this.m_borderStyle;
		in_context.strokeRect(
			this.m_pixelOrigin.m_x, 
			this.m_pixelOrigin.m_y, 
			this.m_pixelSize.m_x, 
			this.m_pixelSize.m_y
			);
	}
}

GuiGameBattleView.prototype.AddTrace = function(in_meterPosStart, in_meterPosFinish, in_fillRed, in_fillGreen, in_fillBlue)
{
	this.m_arrayGuiBattle.push(new GuiGameBattleTrace(in_meterPosStart, in_meterPosFinish, in_fillRed, in_fillGreen, in_fillBlue));
}

GuiGameBattleView.prototype.AddNote = function(in_text, in_meterPos, in_fillStyle)
{
	this.m_arrayGuiBattle.push(new GuiGameBattleNote(in_text, in_meterPos, in_fillStyle));
}

GuiGameBattleView.prototype.AddCharacter = function(in_character, in_key, in_pixelOrigin, in_flip, in_callbackTarget, in_callbackFunctionKey, in_action, in_actionTime)
{
	var sizeDim = 2.0 * Math.max(this.m_pixelsPerMeter.m_x, this.m_pixelsPerMeter.m_y);
	var character = new GuiGameCharacter(
		in_character, 
		in_pixelOrigin, 
		new Vector(sizeDim, sizeDim), 
		in_flip, 
		in_callbackTarget, 
		in_callbackFunctionKey,
		in_action, 
		in_actionTime	
		);	
	
	character.m_key = in_key;
	this.m_arrayGuiGameCharacter.push(character);
	
//var meterPos = this.ConvertPixelToMeterPos(in_pixelOrigin);
//window.defaultStatus = "AddCharacter " + meterPos.m_x + " " + meterPos.m_y;
//window.defaultStatus = "AddCharacter " + in_pixelOrigin.m_x + " " + in_pixelOrigin.m_y + " " + this.m_meterOriginOffset.m_x + " " + this.m_meterOriginOffset.m_y;
}

GuiGameBattleView.prototype.RemoveGameCharacter = function(in_button)
{
	var index = this.m_arrayGuiGameCharacter.indexOf(in_button);
	if (index != -1)
	{
		this.m_arrayGuiGameCharacter.splice(index, 1); 
	}
}

//during deployment, part can be edited, removing or invalidating the character. deal.
GuiGameBattleView.prototype.UpdateParty = function(in_party)
{
	var newArray = [];
	this.m_arrayGuiGameCharacter.forEach(function(in_item)
	{
		if (in_item.m_key < in_party.length)
		{
			in_item.m_character = in_party[in_item.m_key];
			if (false != in_item.m_character.GetValue(s_nodeNameValid))
			{
				newArray.push(in_item);			
			}
		}
	});
	this.m_arrayGuiGameCharacter = newArray;
}

GuiGameBattleView.prototype.ClearCharacterData = function()
{
	this.m_arrayGuiGameCharacter.length = 0;
}

GuiGameBattleView.prototype.AppendBattelData = function(inout_array)
{
	var self = this;
	this.m_arrayGuiGameCharacter.forEach(function(in_item)
	{
		inout_array.push(new BattleCharacterData(
			self.ConvertPixelToMeterPos(in_item.m_pixelOrigin), 
			in_item.m_flip, 
			in_item.m_character
			));			
	});
}

GuiGameBattleView.prototype.CollectDeployedData = function(inout_array)
{
	inout_array.length = 0;
	var self = this;
	this.m_arrayGuiGameCharacter.forEach(function(in_item)
	{
		inout_array.push(new DeployCharacterData(
			self.ConvertPixelToMeterPos(in_item.m_pixelOrigin), 
			in_item.m_flip, 
			in_item.m_key
			));			
	});
}

GuiGameBattleView.prototype.GetCostAll = function()
{
	var cost = 0;
	this.m_arrayGuiGameCharacter.forEach(function(in_item)
	{
		cost += in_item.m_character.GetValue(s_nodeNameCost);
	});
	
	return cost;
}
