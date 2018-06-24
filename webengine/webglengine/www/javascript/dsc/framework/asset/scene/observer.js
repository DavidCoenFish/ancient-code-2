/*

interface
	VisitObserver(in_context)
	VisitGlobalComponent(in_context, in_globalComponent)
	VisitComponent(in_context, in_component)

	//used for sort (if display list is sorted)
	// by providing dng we allow calculate on demand, rather than 
	// going for reduced coupling by having the camera have a 
	//  FustrumTest(pos, radius, sort)
	//  GetSortValue(pos, radius, sort)
	GetNearDng
	GetFarDng
	GetPosDng
	GetAtDng
	GetUnitRadiusFustrumDng //the view fustrum radius on the near plane
	GetFustrumRadiusDepthScaleDng //return true false for if the radius should scale with depth

*/
DSC.Framework.Asset.Scene.Observer = function()
{
	alert("DSC.Framework.Asset.Scene.Observer: namespace, do not construct");
	return;
}
