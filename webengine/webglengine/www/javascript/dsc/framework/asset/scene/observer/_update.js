/*
	VisitObserver()
*/
DSC.Framework.Asset.Scene.Observer_Update = function(in_context)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.Observer_Update) )
		alert("DSC.Framework.Asset.Scene.Observer_Update: call constuctor with new keyword");

	this.m_context = in_context;
	this.m_time = 0.0;

	return;
}

DSC.Framework.Asset.Scene.Observer_Update.prototype.VisitObserver = function(in_timeDelta)
{
	this.m_time += in_timeDelta;
	return true;
}

DSC.Framework.Asset.Scene.Observer_Update.prototype.VisitGlobalComponent = function(in_timeDelta, in_globalComponent)
{
	return true;
}

DSC.Framework.Asset.Scene.Observer_Update.prototype.VisitComponent = function(in_timeDelta, in_component)
{
	in_component.VisitUpdate(in_timeDelta, this.m_context);
	return true;
}

DSC.Framework.Asset.Scene.Observer_Update.FactoryRaw = function(in_context)
{
	return new DSC.Framework.Asset.Scene.Observer_Update(in_context);
}
