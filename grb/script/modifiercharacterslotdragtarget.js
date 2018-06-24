//modifiercharacterslotdragtarget.js

function ModifierCharacterSlotDragTarget(in_modifierSlot, in_gameMode, in_button)
{
	//DEBUG if ( !(this instanceof ModifierCharacterSlotDragTarget) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterSlotDragTarget: call constuctor with new keyword");	
	//DEBUG }

	this.m_modifierSlot = in_modifierSlot;
	this.m_gameMode = in_gameMode;
	this.m_button = in_button;
}

ModifierCharacterSlotDragTarget.prototype.Begin = function()
{
	this.m_button.m_rollover = true;
}

ModifierCharacterSlotDragTarget.prototype.Drop = function(in_dataItem)
{
	if (in_dataItem.Swap)
	{
	//	alert(this.m_modifierSlot + " " + this.m_modifierSlot.GetDataName());
		in_dataItem.Swap(this.m_modifierSlot.GetDataName());
	}

	this.m_modifierSlot.SetModifier(in_dataItem.m_modifierName);
	
	
	this.m_gameMode.PublicUpdateGui();
}

ModifierCharacterSlotDragTarget.prototype.Rollover = function(in_x, in_y)
{
   return ((this.m_button.m_pixelOrigin.m_x < in_x) &&
          (in_x < (this.m_button.m_pixelOrigin.m_x + this.m_button.m_pixelSize.m_x)) &&
          (this.m_button.m_pixelOrigin.m_y < in_y) &&
          (in_y < (this.m_button.m_pixelOrigin.m_y + this.m_button.m_pixelSize.m_y)));
}



//-- END // End Concatinate, unit test or other follows
