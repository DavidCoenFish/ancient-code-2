//guigameslotinfo.js

function GuiGameSlotInfo(in_pixelOrigin, in_pixelSize, in_visible)
{
	//DEBUG if ( !(this instanceof GuiGameSlotInfo) )
	//DEBUG {
	//DEBUG 	alert("GuiGameSlotInfo: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_visible = in_visible;	
	this.m_valid = false;
	this.m_arrayGui = [];
	
	this.m_slotItem = new GuiGameSlotItem(
		new Vector(in_pixelOrigin.m_x, in_pixelOrigin.m_y), 
		new Vector(96, 96), 
		s_guiGameSlotItemType.e_mentalAttackRange, 
		true
		);
	this.m_arrayGui.push(this.m_slotItem);
	this.m_textTitle = new GuiText("", new Vector(in_pixelOrigin.m_x + 100, in_pixelOrigin.m_y));
	this.m_arrayGui.push(this.m_textTitle);

	this.m_textDescription0 = new GuiText("", new Vector(in_pixelOrigin.m_x + 100, in_pixelOrigin.m_y + 30), GuiTextGetSmallFont() );
	this.m_arrayGui.push(this.m_textDescription0);
	this.m_textDescription1 = new GuiText("", new Vector(in_pixelOrigin.m_x + 100, in_pixelOrigin.m_y + 45), GuiTextGetSmallFont() );
	this.m_arrayGui.push(this.m_textDescription1);
	this.m_textDescription2 = new GuiText("", new Vector(in_pixelOrigin.m_x + 100, in_pixelOrigin.m_y + 60), GuiTextGetSmallFont() );
	this.m_arrayGui.push(this.m_textDescription2);
	this.m_textDescription3 = new GuiText("", new Vector(in_pixelOrigin.m_x + 100, in_pixelOrigin.m_y + 75), GuiTextGetSmallFont() );
	this.m_arrayGui.push(this.m_textDescription3);
	this.m_textDescription4 = new GuiText("", new Vector(in_pixelOrigin.m_x + 100, in_pixelOrigin.m_y + 90), GuiTextGetSmallFont() );
	this.m_arrayGui.push(this.m_textDescription4);	
		
	this.m_textStatStatic0 = new GuiText("", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 120), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic0);
	this.m_textStat0 = new GuiText("", new Vector(in_pixelOrigin.m_x + 83, in_pixelOrigin.m_y + 120), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat0);

	this.m_textStatStatic1 = new GuiText("", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 138), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic1);
	this.m_textStat1 = new GuiText("", new Vector(in_pixelOrigin.m_x + 83, in_pixelOrigin.m_y + 138), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat1);

	this.m_textStatStatic2 = new GuiText("", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 156), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic2);
	this.m_textStat2 = new GuiText("", new Vector(in_pixelOrigin.m_x + 83, in_pixelOrigin.m_y + 156), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat2);

	
	this.m_textStatStatic3 = new GuiText("", new Vector(in_pixelOrigin.m_x + 128, in_pixelOrigin.m_y + 120), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic3);
	this.m_textStat3 = new GuiText("", new Vector(in_pixelOrigin.m_x + 203, in_pixelOrigin.m_y + 120), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat3);

	this.m_textStatStatic4 = new GuiText("", new Vector(in_pixelOrigin.m_x + 128, in_pixelOrigin.m_y + 138), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic4);
	this.m_textStat4 = new GuiText("", new Vector(in_pixelOrigin.m_x + 203, in_pixelOrigin.m_y + 138), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat4);
	
	this.m_textStatStatic5 = new GuiText("", new Vector(in_pixelOrigin.m_x + 128, in_pixelOrigin.m_y + 156), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic5);
	this.m_textStat5 = new GuiText("", new Vector(in_pixelOrigin.m_x + 203, in_pixelOrigin.m_y + 156), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat5);


	this.m_textStatStatic6 = new GuiText("", new Vector(in_pixelOrigin.m_x + 248, in_pixelOrigin.m_y + 120), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic6);
	this.m_textStat6 = new GuiText("", new Vector(in_pixelOrigin.m_x + 323, in_pixelOrigin.m_y + 120), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat6);

	this.m_textStatStatic7 = new GuiText("", new Vector(in_pixelOrigin.m_x + 248, in_pixelOrigin.m_y + 138), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic7);
	this.m_textStat7 = new GuiText("", new Vector(in_pixelOrigin.m_x + 323, in_pixelOrigin.m_y + 138), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat7);
	
	this.m_textStatStatic8 = new GuiText("", new Vector(in_pixelOrigin.m_x + 248, in_pixelOrigin.m_y + 156), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStatStatic8);
	this.m_textStat8 = new GuiText("", new Vector(in_pixelOrigin.m_x + 323, in_pixelOrigin.m_y + 156), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textStat8);
	
}

GuiGameSlotInfo.prototype.SetData = function(in_data)
{
	if (undefined == in_data)
	{
		//this.m_valid = false;
		return;
	}
	
	this.m_valid = true;
	this.m_slotItem.m_type = in_data.m_wiggitType;
	
	var description = in_data.m_description;
	if (undefined != description)
	{
		this.m_textTitle.m_text = description.m_prettyName;
		var splitString = SplitStringLength(description.m_line, 40);
		this.m_textDescription0.m_text = splitString[0] || "";
		this.m_textDescription1.m_text = splitString[1] || "";
		this.m_textDescription2.m_text = splitString[2] || "";
		this.m_textDescription3.m_text = splitString[3] || "";
		this.m_textDescription4.m_text = splitString[4] || "";
	}
	else
	{
		this.m_textTitle.m_text = "";
		this.m_textDescription0.m_text = "";
		this.m_textDescription1.m_text = "";
		this.m_textDescription2.m_text = "";
		this.m_textDescription3.m_text = "";
		this.m_textDescription4.m_text = "";
	}
	
	for (var index = 0; index < 9; ++index)
	{
		var nameStatic = "m_textStatStatic" + index;
		var name = "m_textStat" + index;
		
		var guiTestStatic = this[nameStatic];
		var guiText = this[name];
		
		var title = undefined;
		if (undefined != description)
		{		
			title = description.m_arrayNameValue[index];
		}
		if (undefined != title)
		{
			guiTestStatic.m_text = title + ":";
			guiText.m_text = "" + in_data.GetInfoValue(title);
		}
		else
		{
			guiTestStatic.m_text = "";
			guiText.m_text = "";
		}
	}
}

GuiGameSlotInfo.prototype.Draw = function(in_context, in_canvas)
{
	if ((false == this.m_visible) ||
		(false == this.m_valid))
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

