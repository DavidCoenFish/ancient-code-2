Task.Destination = function(in_style, in_text)
{
	if ( !(this instanceof Task.Destination) )
		alert("Task.Destination: call constuctor with new keyword");	

	this.m_style = in_style;
	this.m_text = in_text;
	this.m_selected = false;
	this.m_selectFade = 0.0;
	this.m_count = 0;
	this.m_lastX = 0;
	this.m_lastY = 0;
	this.m_tokenArray = [];
}

Task.Destination.prototype.Draw = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	this.m_lastX = _originX;
	this.m_lastY = _originY;
	if (0.0 < this.m_selectFade)
	{
		this.m_selectFade -= in_timeDelta;
	}

	for (var index = 0; index < this.m_tokenArray.length; ++index)
	{
		var destinationToken = this.m_tokenArray[index];
		if (!destinationToken.Draw(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY))
		{
			this.m_tokenArray.splice(index, 1);
		}
	}

	if (true == this.m_selected || (0.0 < this.m_selectFade))
	{	
		in_framework.m_context.save();
		in_framework.m_context.strokeStyle = "#FF9900";
		in_framework.m_context.beginPath();
		in_framework.m_context.rect(_originX + 2, _originY + 2, _sizeX - 4, _sizeY - 4);
		in_framework.m_context.closePath();
		in_framework.m_context.fill();
		in_framework.m_context.restore();
	}

	in_framework.m_context.fillStyle = this.m_style;
	in_framework.m_context.strokeStyle = this.m_style;

	in_framework.m_context.beginPath();
	in_framework.m_context.rect(_originX + 2, _originY + 2, _sizeX - 4, _sizeY - 4);
	in_framework.m_context.closePath();
	in_framework.m_context.stroke();

	var fillStepIn = Task.Destination.s_fillStepIn * _sizeX;
	in_framework.m_context.textBaseline = "top";
	in_framework.m_context.fillText(this.m_text + ((0 < this.m_count) ? " " + this.m_count : ""), _originX + 4, _originY + 4);

	return;
}

Task.Destination.FactoryRaw = function(in_style, in_text)
{
	return new Task.Destination(in_style, in_text);
}
