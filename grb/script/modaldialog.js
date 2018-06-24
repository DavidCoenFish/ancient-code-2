//modaldialog.js

function ModalDialog(in_text, in_pixelOrigin, in_pixelSize, in_arrayButtonData, in_buttonStyle, in_context, in_canvas)
{
	//DEBUG if ( !(this instanceof ModalDialog) )
	//DEBUG {
	//DEBUG 	alert("ModalDialog: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
    var that = this;	
    var m_arrayGui = [];
    
    m_arrayGui.push(new GuiPanel(in_pixelOrigin, in_pixelSize, "#fdde9e", "#2a1102", false, 32));
    m_arrayGui.push(new GuiText(in_text, new Vector(in_pixelOrigin.m_x + 16, in_pixelOrigin.m_y + 16), GuiTextGetSmallFont()));
  
	if (0 < in_arrayButtonData.length)
	{
		var buttonLength = (in_pixelSize.m_x - ((in_arrayButtonData.length + 3) * 32.0)) / in_arrayButtonData.length;
		var size = new Vector(buttonLength, 40.0);
		in_arrayButtonData.forEach(function(in_item, in_index)
		{
			var origin = new Vector(
				in_pixelOrigin.m_x + (in_index * buttonLength) + ((in_index + 2) * 32.0),
				in_pixelOrigin.m_y + in_pixelSize.m_y - (16.0 + 40.0)
				);
			 
			m_arrayGui.push(new GuiButton(
				in_item.m_text, 
				origin,  
				size, 
				in_item.m_callbackTarget, 
				in_item.m_callbackFunctionKey, 
				in_buttonStyle, 
				in_context, 
				in_canvas
				));  		
		});	
	}
	
	this.Tick = function(in_timeDelta)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });	
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });	
	}	
}

//-- END // End Concatinate, unit test or other follows
