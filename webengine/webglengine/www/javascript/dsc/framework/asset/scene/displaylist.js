/*	

display list is for components of node, 
have filter to get the components we are interested in

*/
DSC.Framework.Asset.Scene.DisplayList = function(in_observer, _filter, _sortType)
{
	if ( !(this instanceof DSC.Framework.Asset.Scene.DisplayList) )
		alert("DSC.Framework.Asset.Scene.DisplayList: call constuctor with new keyword");

	this.m_observer = in_observer;
	this.m_filter = _filter;
	this.m_sortType = (undefined == _sortType) ? DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNone : _sortType;
	this.m_arrayData = [];
	this.m_arrayGlobalComponent = [];

	return;
}

DSC.Framework.Asset.Scene.DisplayList.s_sortType = 
{
	"TNone" : 0,
	"TNearToFar" : 1, //cull on fustrum/ isVisible
	"TFarToNear" : 2, //cull on fustrum/ isVisible
	"TNearestToObserver" : 3,
	"TLargestMagnatude" : 4, //largest magnatude at observer
}

DSC.Framework.Asset.Scene.DisplayList.prototype.Visit = function(_data, in_name)
{
	this.Sort();
	if (true != this.m_observer.VisitObserver(_data, in_name))
		return;

	if (this.m_observer.VisitGlobalComponent)
	{
		for (var index = 0; index < this.m_arrayGlobalComponent.length; ++index)
		{
			var component = this.m_arrayGlobalComponent[index];
			this.m_observer.VisitGlobalComponent(_data, component);
		}
	}

	if (this.m_observer.VisitComponent)
	{
		for (var index = 0; index < this.m_arrayData.length; ++index)
		{
			var data = this.m_arrayData[index];
			if (true != this.m_observer.VisitComponent(_data, data.m_component, in_name))
				return;
		}
	}

	return;
}

DSC.Framework.Asset.Scene.DisplayList.prototype.SortNearToFar = function()
{
	this.m_arrayData.sort(function(in_left, in_right){
		var lhsVisible = in_left.IsVisible();
		var rhsVisible = in_right.IsVisible();
		if (lhsVisible != rhsVisible)
		{
			return (true == rhsVisible) ? -1 : 1;
		}

		var lhsSort = in_left.GetSortValue();
		var rhsSort = in_right.GetSortValue();
		if (lhsSort != rhsSort)
		{
			return (lhsSort < rhsSort) ? -1 : 1;
		}

		return 0;
	});
}

DSC.Framework.Asset.Scene.DisplayList.prototype.SortFarToNear = function()
{
	this.m_arrayData.sort(function(in_left, in_right){
		var lhsVisible = in_left.IsVisible();
		var rhsVisible = in_right.IsVisible();
		if (lhsVisible != rhsVisible)
		{
			return (true == rhsVisible) ? -1 : 1;
		}

		var lhsSort = in_left.GetSortValue();
		var rhsSort = in_right.GetSortValue();
		if (lhsSort != rhsSort)
		{
			return (lhsSort < rhsSort) ? 1 : -1;
		}

		return 0;
	});
}


DSC.Framework.Asset.Scene.DisplayList.prototype.Sort = function()
{
	switch (this.m_sortType)
	{
	default:
		break;
	case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNone:
		break;
	case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearToFar:
		this.SortNearToFar();
		break;
	case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TFarToNear:
		this.SortFarToNear();
		break;
	case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearestToObserver:
		break;
	case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TLargestMagnatude:
		break;
	}

	return;
}

DSC.Framework.Asset.Scene.DisplayList.prototype.AddGlobalComponent = function(in_globalComponent)
{
	if (true == in_globalComponent.PassFilter(this.m_filter))
	{
		this.m_arrayGlobalComponent.push(in_globalComponent);
	}

	return;
}

DSC.Framework.Asset.Scene.DisplayList.prototype.RemoveGlobalComponent = function(in_globalComponent)
{
	var index = 0; 
	while (index < this.m_arrayGlobalComponent.length)
	{
		var component = this.m_arrayGlobalComponent[index];
		if (component == in_globalComponent)
		{	
			this.m_arrayGlobalComponent.splice(index, 1);
		}
		else
		{
			++index;
		}
	}

	return;
}

DSC.Framework.Asset.Scene.DisplayList.prototype.AddNode = function(in_node)
{
	var that = this;
	in_node.m_componentArray.forEach(function (component) {
		if (true != component.PassFilter(that.m_filter))
		{
			return;
		}

		var data;
		switch (that.m_sortType)
		{
		default:
			break;
		case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNone:
			data = DSC.Framework.Asset.Scene.DisplayList.Data.FactoryNone(
				component
				);
			break;
		case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearToFar:
			data = DSC.Framework.Asset.Scene.DisplayList.Data.FactoryNearToFar(
				that.m_observer,
				component
				);
			break;
		case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TFarToNear:
			data = DSC.Framework.Asset.Scene.DisplayList.Data.FactoryFarToNear(
				that.m_observer,
				component
				);
			break;
		case DSC.Framework.Asset.Scene.DisplayList.s_sortType.TNearestToObserver:
			data = DSC.Framework.Asset.Scene.DisplayList.Data.FactoryNearestToObserver(
				that.m_observer,
				component
				);
			break;
		}
		if (undefined != data)
		{
			that.m_arrayData.push(data);
		}
	});

	return;
}

DSC.Framework.Asset.Scene.DisplayList.prototype.RemoveNode = function(in_node)
{
	var index = 0; 
	while (index < this.m_arrayData.length)
	{
		var data = this.m_arrayData[index];
		if (data.m_component in in_node.m_componentArray)
		{	
			this.m_arrayData.splice(index, 1);
		}
		else
		{
			++index;
		}
	}

	return;
}

DSC.Framework.Asset.Scene.DisplayList.FactoryRaw = function(in_observerComponent, _filter, _sortType)
{
	return new DSC.Framework.Asset.Scene.DisplayList(in_observerComponent, _filter, _sortType);
}
