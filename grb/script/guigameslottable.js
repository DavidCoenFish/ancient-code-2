//guigameslottable.js


var s_guiGameSlotTableFilter = {
	"e_all" : 0,

	"e_allMental" : 1,
	"e_allPhysical" : 2,
	
	"e_physicalAttackMetalRange" : 10,
	"e_physicalAttackMetalTouch" : 11,
	"e_physicalAttackNometalRange" : 12,
	"e_physicalAttackNometalTouch" : 13,
	"e_physicalDefendMetal" : 14,
	"e_physicalDefendNometal" : 15,
	"e_physicalBuffSelf" : 16,
	
	"e_mentalAttackRange" : 30,
	"e_mentalAttackTouch" : 31,
	"e_mentalHealRange" : 32,
	"e_mentalHealTouch" : 33,
	"e_mentalHealSelf" : 34,
	"e_mentalDefend" : 35,
	"e_mentalBuffRange" : 36,
	"e_mentalBuffSelf" : 37
	
};

var s_guiGameSlotTableFilterClass = {
	"e_all" : 0,
	"e_fighter" : 1,
	"e_mage" : 2,
	"e_cleric" : 3,
	"e_thief" : 4
};

function GuiGameSlotTable(in_pixelOrigin, in_pixelSize, in_visible, in_game, in_class, in_callbackTarget, in_callbackNameClick, in_context, in_canvas)
{
	//DEBUG if ( !(this instanceof GuiGameSlotTable) )
	//DEBUG {
	//DEBUG 	alert("GuiGameSlotTable: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_visible = in_visible;
	this.m_class = in_class;
	this.m_callbackTarget = in_callbackTarget;
	this.m_callbackNameClick = in_callbackNameClick;
	this.m_game = in_game;
	
	this.m_arrayGui = [];
	this.m_arrayGuiSlot = [];
	
	this.m_scrollBar = new GuiScrollBarVertical(
		new Vector(in_pixelOrigin.m_x + in_pixelSize.m_x - 28, in_pixelOrigin.m_y + 30), 
		new Vector(20, in_pixelSize.m_y - 41), 
		true, 
		0.1, 
		0.5, 
		this, 
		"CallbackScrollBar"
		);
	this.m_arrayGui.push(this.m_scrollBar);	
	
	var buttonWidth = (in_pixelSize.m_x * 0.5);
		
	this.m_buttonFilter = new GuiButton(
		"All", 
		new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 6),  
		new Vector(buttonWidth -16, 16),  
		this, 
		"CallbackButtonFilter", 
		s_guiButtonStyle.e_simple, 
		in_context, 
		in_canvas
		);
	this.m_arrayGui.push(this.m_buttonFilter);	
	this.m_buttonFilter.m_font = GuiTextGetSmallFont();
	
	this.m_buttonClass = new GuiButton(
		"All", 
		new Vector(in_pixelOrigin.m_x + buttonWidth + 8, in_pixelOrigin.m_y + 6),  
		new Vector(buttonWidth - 16, 16),  
		this, 
		"CallbackButtonFilterClass", 
		s_guiButtonStyle.e_simple, 
		in_context, 
		in_canvas
		);
	this.m_arrayGui.push(this.m_buttonClass);	
	this.m_buttonClass.m_font = GuiTextGetSmallFont();

	this.m_heightCount = Math.floor((in_pixelSize.m_y - 30) / 40);
	this.m_widthCount = Math.floor((in_pixelSize.m_x - 30) / 40);

	var trace = 0;
	for (var indexY = 0; indexY < this.m_heightCount; ++indexY)
	{
		for (var indexX = 0; indexX < this.m_widthCount; ++indexX)
		{
			var item = new GuiGameSlotItem(
				new Vector(in_pixelOrigin.m_x + (42 * indexX) + 2, in_pixelOrigin.m_y + (42 * indexY) + 26), 
				new Vector(40, 40), 
				s_guiGameSlotItemType.e_physicalAttackMetalRange, 
				true,
				this,
				"CallbackSlotItem"
				);
			item.m_softShadow = false;
			item.m_key = trace;
			trace += 1;
			this.m_arrayGuiSlot.push(item);
			this.m_arrayGui.push(item);	
		}	
	}
	
	this.m_classFilterEnable = true;
	this.m_classFilter = s_guiGameSlotTableFilterClass.e_all;
	
	this.m_itemFilterEnable = true;
	this.m_itemFilter = s_guiGameSlotTableFilter.e_all;
	this.m_scrollBase = 0;
}

GuiGameSlotTable.prototype.CallbackScrollBar = function(in_scrollBar, in_clickLocation)
{
	var startLine = Math.max(0, Math.min(Math.floor((in_clickLocation * this.m_scrollLineCount)), this.m_scrollLineCount - this.m_heightCount));
	this.m_scrollBase = startLine * this.m_widthCount;
	in_scrollBar.m_barLow = startLine / this.m_scrollLineCount;
	in_scrollBar.m_barHigh = (startLine + this.m_heightCount) / this.m_scrollLineCount; 

	this.UpdateIcon();
}

GuiGameSlotTable.prototype.CallbackSlotItem = function(in_button)
{
	//populate info
	var selectedKey = this.m_arraySlotKey[in_button.m_key + this.m_scrollBase];
	if (undefined == selectedKey)
	{
		return;
	}

	if (undefined != this.m_callbackTarget)
	{
		this.m_callbackTarget[this.m_callbackNameClick](selectedKey, in_button);
	}
}

GuiGameSlotTable.prototype.CallbackButtonFilter = function(in_button)
{
	var dataExchangeObject = {};
	dataExchangeObject.m_game = this.m_game;
	dataExchangeObject.m_table = this;
	dataExchangeObject.m_arrayData = [
		new GuiListData("All", s_guiGameSlotTableFilter.e_all, false), 		
		new GuiListData("All Mental", s_guiGameSlotTableFilter.e_allMental, false), 		
		new GuiListData("All Physical", s_guiGameSlotTableFilter.e_allPhysical, false), 		
		new GuiListData("Physical Attack Metal Range", s_guiGameSlotTableFilter.e_physicalAttackMetalRange, false), 		
		new GuiListData("Physical Attack Metal Touch", s_guiGameSlotTableFilter.e_physicalAttackMetalTouch, false), 		
		new GuiListData("Physical Attack Range", s_guiGameSlotTableFilter.e_physicalAttackNometalRange, false), 		
		new GuiListData("Physical Attack Touch", s_guiGameSlotTableFilter.e_physicalAttackNometalTouch, false), 		
		new GuiListData("Physical Defend Metal", s_guiGameSlotTableFilter.e_physicalDefendMetal, false), 		
		new GuiListData("Physical Defend", s_guiGameSlotTableFilter.e_physicalDefendNometal, false), 		
		new GuiListData("Physical Buff Self", s_guiGameSlotTableFilter.e_physicalBuffSelf, false), 		
		new GuiListData("Mental Attack Range", s_guiGameSlotTableFilter.e_mentalAttackRange, false), 		
		new GuiListData("Mental Attack Touch", s_guiGameSlotTableFilter.e_mentalAttackTouch, false), 		
		new GuiListData("Mental Heal Range", s_guiGameSlotTableFilter.e_mentalHealRange, false), 		
		new GuiListData("Mental Heal Touch", s_guiGameSlotTableFilter.e_mentalHealTouch, false), 		
		new GuiListData("Mental Heal Self", s_guiGameSlotTableFilter.e_mentalHealSelf, false), 		
		new GuiListData("Mental Defend", s_guiGameSlotTableFilter.e_mentalDefend, false), 		
		new GuiListData("Mental Buff Range", s_guiGameSlotTableFilter.e_mentalBuffRange, false), 		
		new GuiListData("Mental Buff Self", s_guiGameSlotTableFilter.e_mentalBuffSelf, false)
		];
		
	dataExchangeObject.GetSelectedKey = function()
	{
		return this.m_table.m_itemFilter;
	}
	dataExchangeObject.SetSelectedData = function(in_data)
	{
		this.m_table.SetItemFilter(in_data.m_key);
		this.m_table.m_buttonFilter.m_text = in_data.m_text;
	}
	dataExchangeObject.GetArrayListData = function()
	{
		return this.m_arrayData;
	}
	dataExchangeObject.GetDisplayCount = function()
	{
		return this.m_arrayData.length;
	}
	
	var dropList = new GameModeDropList(
		this.m_game, 
		new Vector(in_button.m_pixelOrigin.m_x + 5, in_button.m_pixelOrigin.m_y + in_button.m_pixelSize.m_y),
		new Vector(in_button.m_pixelSize.m_x - 10, in_button.m_pixelSize.m_y),
		dataExchangeObject,
		GuiTextGetSmallFont()
		);

	this.m_game.PushGameMode(dropList);

}


GuiGameSlotTable.prototype.SetClassFilterEnable = function(in_enable)
{
	this.m_classFilterEnable = in_enable;
	this.m_buttonClass.SetVisible(in_enable);
}

GuiGameSlotTable.prototype.SetClassFilter = function(in_classFilter)
{
	this.m_classFilter = s_guiGameSlotTableFilterClass.e_all;
	switch (in_classFilter)
	{
	case s_modifierClass.e_fighter:
		this.m_classFilter = s_guiGameSlotTableFilterClass.e_fighter;
		break;
	case s_modifierClass.e_mage:
		this.m_classFilter = s_guiGameSlotTableFilterClass.e_mage;
		break;
	case s_modifierClass.e_cleric:
		this.m_classFilter = s_guiGameSlotTableFilterClass.e_cleric;
		break;
	case s_modifierClass.e_thief:
		this.m_classFilter = s_guiGameSlotTableFilterClass.e_thief;
		break;
	default:
	}
	this.Update();
}

GuiGameSlotTable.prototype.SetItemFilter = function(in_itemFilter)
{
	this.m_itemFilter = in_itemFilter;
	this.Update();
}

GuiGameSlotTable.prototype.Tick = function(in_timeDelta)
{
	if (false == this.m_visible)
	{
		return;
	}

	this.m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });
}

GuiGameSlotTable.prototype.Update = function()
{
	this.m_arraySlotKey = this.m_game.GetArrayModifierSlot(this.m_itemFilter, this.m_classFilter);
	this.m_scrollBase = 0;
	
	//if there are more than 
	var slotCount = this.m_widthCount * this.m_heightCount;
	if (slotCount < this.m_arraySlotKey.length)
	{
		this.m_scrollBar.m_visible = true;
		this.m_scrollBar.m_barLow = 0.0;
		this.m_scrollLineCount = Math.ceil(this.m_arraySlotKey.length / this.m_widthCount);
		this.m_scrollBar.m_barHigh = this.m_heightCount / this.m_scrollLineCount;
	}
	else
	{
		this.m_scrollBar.m_visible = false;
	}

	this.UpdateIcon();
}

GuiGameSlotTable.prototype.UpdateIcon = function()
{
	var slotCount = this.m_widthCount * this.m_heightCount;
	for (var index = 0; index < slotCount; ++index)
	{
		var key = this.m_arraySlotKey[index + this.m_scrollBase];
		var data = undefined;
		if (undefined != key)
		{
			data = s_mapModifierCharacterSlotData[key];
		}
		var localType = s_guiGameSlotItemType.e_none;
		if (undefined != data)
		{
			localType = data.m_wiggitType;
		}
			
		this.m_arrayGuiSlot[index].m_type = localType;
	}
}


GuiGameSlotTable.prototype.Draw = function(in_context, in_canvas)
{
	if (false == this.m_visible)
	{
		return;
	}

	this.m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });
	
	return;

	//in_context.save();

	//in_context.strokeStyle = "#b27c4d";
	//in_context.lineWidth = 4;
	//in_context.lineJoin = "round";	
	//in_context.strokeRect(
	//	this.m_pixelOrigin.m_x, 
	//	this.m_pixelOrigin.m_y, 
	//	this.m_pixelSize.m_x, 
	//	this.m_pixelSize.m_y
	//	);	

	//in_context.restore();
	
	
	
}

//-- END // End Concatinate, unit test or other follows

