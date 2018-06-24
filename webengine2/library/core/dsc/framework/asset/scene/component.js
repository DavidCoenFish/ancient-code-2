/*
	interface component
		IsActive() //return true, false ~visible, generating sound, emitting light
		PassFilter(in_filter)
		SetParentNode(_parentNode)
		//GetMatrixWorldTransform()
		GetRadiusDng() //if display list sorted
		GetPosDng() //if display list sorted
		//Visit()

*/
DSC.Framework.Asset.Scene.Component = function()
{
	alert("DSC.Framework.Asset.Scene.Component: abstract class, do not construct");
	return;
}
