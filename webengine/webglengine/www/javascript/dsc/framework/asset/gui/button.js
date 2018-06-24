/*
interface for callback target
	CallbackDown(in_ratioX, in_ratioY)
	CallbackHeld(in_totalTime, in_currentTimeDelta)
	CallbackDrag(in_ratioX, in_ratioY)
	CallbackUp(in_ratioX, in_ratioY)
	CallbackOver(in_ratioX, in_ratioY, in_over)
*/

DSC.Framework.Asset.Gui.Button = function(
	in_state,
	_coordinateOrigin, 
	_coordinateSize, 
	_callbackTarget,
	_arrayDrawable
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui.Button) )
		alert("Gui.Button: call constuctor with new keyword");	

	this.m_state = in_state;
	this.m_arrayDrawable = (undefined == _arrayDrawable) ? [] : _arrayDrawable;
	this.m_coordinateOrigin = _coordinateOrigin;
	this.m_coordinateSize = _coordinateSize;
	this.m_callbackTarget = _callbackTarget;

	this.m_over = false;
	this.m_clicked = false;
	this.m_clickDuration = 0.0;
	this.m_clickCooldown = 0.0;

	return;
}

DSC.Framework.Asset.Gui.Button.s_stateClickCooldown = 0.25;

DSC.Framework.Asset.Gui.Button.prototype.Run = function(in_framework, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta, in_mapMaterial)
{
	if (0.0 < this.m_clickCooldown)
		this.m_clickCooldown -= _timeDelta;

	if (DSC.Framework.Asset.Gui.s_state.e_hidden == this.m_state)
		return;

	this.m_frame = DSC.Math.Frame.CalculateFrame(this.m_frame, in_originX, in_originY, in_sizeX, in_sizeY, this.m_coordinateOrigin, this.m_coordinateSize);
	var context = in_framework.m_context;

	//do input hit test for button if in default state
	if ((DSC.Framework.Asset.Gui.s_state.e_default == this.m_state) &&
		(undefined != in_framework.m_input))
	{
		this.DealInput(
			in_framework.m_input, 
			DSC.Math.Frame.GetOriginX(this.m_frame),
			DSC.Math.Frame.GetOriginY(this.m_frame),
			DSC.Math.Frame.GetSizeX(this.m_frame),
			DSC.Math.Frame.GetSizeY(this.m_frame),
			_timeDelta
			);
	}

	//deal state - over, active
	var localState = this.m_state;
	if ((true == this.m_clicked) || (0.0 < this.m_clickCooldown))
	{
		localState = DSC.Framework.Asset.Gui.s_state.e_active;
	}
	else if (true == this.m_over)
	{
		localState = DSC.Framework.Asset.Gui.s_state.e_over;		
	}

	var that = this;
	this.m_arrayDrawable.forEach(function(drawable)
	{
		drawable.SetState(localState, DSC.Framework.Asset.Gui.s_subState.e_foreground);
		drawable.Run(
			in_framework,
			DSC.Math.Frame.GetOriginX(that.m_frame),
			DSC.Math.Frame.GetOriginY(that.m_frame),
			DSC.Math.Frame.GetSizeX(that.m_frame),
			DSC.Math.Frame.GetSizeY(that.m_frame),
			_timeDelta,
			in_mapMaterial
			);
	});

}

DSC.Framework.Asset.Gui.Button.prototype.DealInput = function(in_input, in_originX, in_originY, in_sizeX, in_sizeY, _timeDelta)
{
	var ratioX = (0.0 != in_sizeX) ? (in_input.m_mouseX - in_originX) / in_sizeX : -1.0;
	var ratioY = (0.0 != in_sizeY) ? (in_input.m_mouseY - in_originY) / in_sizeY : -1.0;
	var over = ((0.0 <= ratioX) &&
		(ratioX <= 1.0) &&
		(0.0 <= ratioY) &&
		(ratioY <= 1.0));

	if (over != this.m_over)
	{
		this.m_over = over;
		if ((undefined != this.m_callbackTarget) &&
			("CallbackOver" in this.m_callbackTarget))
		{
			this.m_callbackTarget.CallbackOver(ratioX, ratioY, this.m_over);
		}
	}

	if (true == in_input.m_mouseEdge)
	{
		if (true == in_input.m_mouseDown)
		{
			//mouse down edge
			if (true == this.m_over)
			{
				this.m_clicked = true;
				this.m_clickDuration = 0.0;
				if ((undefined != this.m_callbackTarget) &&
					("CallbackDown" in this.m_callbackTarget))
				{
					this.m_callbackTarget.CallbackDown(ratioX, ratioY);
				}
			}
			else
			{
				//a new click, deactivate incase old click up got lost
				this.m_clicked = false;
			}
		}
		else
		{
			//mouse up edge
			if (true == this.m_clicked)
			{
				this.m_clicked = false;
				this.m_clickCooldown = DSC.Framework.Asset.Gui.Button.s_stateClickCooldown;
				if ((true == this.m_over) &&  
					(undefined != this.m_callbackTarget) &&
					("CallbackUp" in this.m_callbackTarget))
				{
					this.m_callbackTarget.CallbackUp(ratioX, ratioY);
				}
			}
		}
	}
	else if ((true == in_input.m_mouseDown) &&
		(true == this.m_clicked))
	{
		this.m_clickDuration += (undefined != _timeDelta) ? _timeDelta : 0.0;
		if ((undefined != this.m_callbackTarget) &&
			("CallbackHeld" in this.m_callbackTarget))
		{
			this.m_callbackTarget.CallbackHeld(this.m_clickDuration, _timeDelta);
		}
		if ((undefined != this.m_callbackTarget) &&
			("CallbackDrag" in this.m_callbackTarget))
		{
			this.m_callbackTarget.CallbackDrag(ratioX, ratioY);
		}
	}

	return;
}	

DSC.Framework.Asset.Gui.Button.prototype.Add = function(in_drawable)
{
	if (undefined != in_drawable)
		this.m_arrayDrawable.push(in_drawable);
}

DSC.Framework.Asset.Gui.Button.prototype.Remove = function(in_drawable)
{
	var index = this.m_drawableArray.indexOf(in_drawable);
	if (-1 == index)
		return;
	this.m_drawableArray.splice(index, 1);
}

DSC.Framework.Asset.Gui.Button.FactoryRaw = function(
	in_state,
	_coordinateOrigin, 
	_coordinateSize, 
	_callbackTarget,
	_arrayDrawable
	)
{
	return new DSC.Framework.Asset.Gui.Button(
		in_state,
		_coordinateOrigin, 
		_coordinateSize, 
		_callbackTarget,
		_arrayDrawable
		);
}
