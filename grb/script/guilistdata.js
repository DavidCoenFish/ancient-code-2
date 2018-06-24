//guilistdata.js

function GuiListData(in_text, in_key, in_selected)
{
	//DEBUG if ( !(this instanceof GuiListData) )
	//DEBUG {
	//DEBUG 	alert("GuiListData: call constuctor with new keyword");	
	//DEBUG }
	
	if (undefined == in_text)
	{
		in_text = "";
	}
	if (undefined == in_key)
	{
		in_key = 0;
	}		
	if (undefined == in_selected)
	{
		in_selected = false;
	}

	this.m_text = in_text;
	this.m_key = in_key;
	this.m_selected = in_selected;
}

//-- END // End Concatinate, unit test or other follows
