/*
	global components still have filter and active, but dont have position/ notion of parent

	interface globalComponent
		IsActive() //return true, false ~visible, generating sound, emitting light
		PassFilter(in_filter)


*/
DSC.Framework.Asset.Scene.GlobalComponent = function()
{
	alert("DSC.Framework.Asset.Scene.Component: namespace, do not construct");
	return;
}
