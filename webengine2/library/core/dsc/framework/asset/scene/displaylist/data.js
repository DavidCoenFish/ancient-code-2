/*
interface
	//combined with component IsActive and in fustrum
	IsVisible 
	GetSortValue
*/
DSC.Framework.Asset.Scene.DisplayList.Data = function(
	in_component,
	_inFustrumDng,
	_sortValueDng
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.DisplayList.Data) )
		alert("DSC.Framework.Asset.Scene.DisplayList.Data: call constuctor with new keyword");
	
	this.m_component = in_component;
	this.m_inFustrumDng = _inFustrumDng;
	this.m_sortValueDng = _sortValueDng;

	return;
}

DSC.Framework.Asset.Scene.DisplayList.Data.prototype.IsVisible = function()
{
	return (this.m_component.IsActive() && this.m_inFustrumDng.GetValue());
}

DSC.Framework.Asset.Scene.DisplayList.Data.prototype.GetSortValue = function()
{
	return this.m_sortValueDng.GetValue();
}

DSC.Framework.Asset.Scene.DisplayList.Data.FactoryNearToFar = function(
	in_observer,
	in_component
	)
{
	var distanceDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.RayDistance);
	DSC.DNG.Container.LinkNodes(distanceDng, in_component.GetPosDng(), 0);
	DSC.DNG.Container.LinkNodes(distanceDng, in_component.GetRadiusDng(), 1);
	DSC.DNG.Container.LinkNodes(distanceDng, in_observer.GetPosDng(), 2);
	DSC.DNG.Container.LinkNodes(distanceDng, in_observer.GetAtDng(), 3);

	var inFustrumDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.InFustrum);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_component.GetPosDng(), 0);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetPosDng(), 1);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetAtDng(), 2);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_component.GetRadiusDng(), 3);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetUnitRadiusFustrumDng(), 4);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetFustrumRadiusDepthScaleDng(), 5);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetNearDng(), 6);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetFarDng(), 7);

	return DSC.Framework.Asset.Scene.DisplayList.Data.FactoryRaw(
		in_component,
		inFustrumDng,
		distanceDng
		);
}

DSC.Framework.Asset.Scene.DisplayList.Data.FactoryFarToNear = function(
	in_observer,
	in_component
	)
{
	var distanceDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.RayDistance);
	DSC.DNG.Container.LinkNodes(distanceDng, in_component.GetPosDng(), 0);
	DSC.DNG.Container.LinkNodes(distanceDng, in_component.GetRadiusDng(), 1);
	DSC.DNG.Container.LinkNodes(distanceDng, in_observer.GetPosDng(), 2);
	DSC.DNG.Container.LinkNodes(distanceDng, in_observer.GetAtDng(), 3);

	var inFustrumDng = DSC.DNG.Node.FactoryRaw(undefined, DSC.DNG.UpdateFunction.InFustrum);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_component.GetPosDng(), 0);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetPosDng(), 1);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetAtDng(), 2);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_component.GetRadiusDng(), 3);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetUnitRadiusFustrumDng(), 4);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetFustrumRadiusDepthScaleDng(), 5);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetNearDng(), 6);
	DSC.DNG.Container.LinkNodes(inFustrumDng, in_observer.GetFarDng(), 7);

	return DSC.Framework.Asset.Scene.DisplayList.Data.FactoryRaw(
		in_component,
		inFustrumDng,
		distanceDng
		);
}

DSC.Framework.Asset.Scene.DisplayList.Data.FactoryNearestToObserver = function(
	in_observer,
	in_component
	)
{
}

DSC.Framework.Asset.Scene.DisplayList.Data.FactoryNone = function(
	in_component
	)
{
	return DSC.Framework.Asset.Scene.DisplayList.Data.FactoryRaw(
		in_component
		);
}

DSC.Framework.Asset.Scene.DisplayList.Data.FactoryRaw = function(
	in_component,
	_inFustrumDng,
	_sortValueDng
	)
{
	return new DSC.Framework.Asset.Scene.DisplayList.Data(
		in_component,
		_inFustrumDng,
		_sortValueDng
		);
}
