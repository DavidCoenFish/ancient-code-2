/*
map of materials for state
	static [foreground, background] //non interactive
	default [foreground, background] //can be clicked
	disabled [foreground, background] //can not be clicked
	over [foreground, background] //rolled over? selected
	active [foreground, background] //clicked? click down
	hidden //not drawn
*/

DSC.Framework.Asset.Gui = function(
	in_framework,
	_materialMap, 
	_rootDrawable
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Gui) )
		alert("DSC.Framework.Asset.Gui: call constuctor with new keyword");

	this.m_rootDrawable = (undefined != _rootDrawable) ? _rootDrawable : 
		DSC.Framework.Asset.Gui.Collection.FactoryRaw(
			DSC.Math.Coordinate.FactoryRaw(),
			DSC.Math.Coordinate.FactoryRaw(1, 1)
		);

	this.m_materialMap = (undefined != _materialMap) ? _materialMap : DSC.Framework.Asset.Gui.FactoryMaterialMap(in_framework);

	return;
}

DSC.Framework.Asset.Gui.s_state = {
	"e_default" : 0,
	"e_disabled" : 1,
	"e_static" : 2,
	"e_hidden" : 3,
	"e_over" : 4, //substate of default, rollover
	"e_active" : 5, //substate of default, after click
};

DSC.Framework.Asset.Gui.s_subState = {
	"e_foreground" : 0,
	"e_background" : 1
};

DSC.Framework.Asset.Gui.prototype.GetRoot = function()
{
	return this.m_rootDrawable;
}

DSC.Framework.Asset.Gui.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	this.m_rootDrawable.Run(in_framework, _originX, _originY, _sizeX, _sizeY, in_timeDelta, this.m_materialMap);
	return;
}

DSC.Framework.Asset.Gui.FactoryMaterialMap = function(in_framework)
{
	var materialMap = {};
	if (undefined == in_framework.m_asset)
		return materialMap;

	//e_static
	{
		var data = {};
		var foreground = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.0, 0.0, 0.0, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_foreground] = foreground;

		var background = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(1.0, 1.0, 1.0, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_background] = background;

		materialMap[DSC.Framework.Asset.Gui.s_state.e_static] = data;
	}

	//default
	{
		var data = {};
		var foreground = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.2, 0.2, 0.2, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_foreground] = foreground;

		var background = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.8, 0.8, 0.8, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_background] = background;

		materialMap[DSC.Framework.Asset.Gui.s_state.e_default] = data;
	}

	//disabled
	{
		var data = {};
		var foreground = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.4, 0.4, 0.4, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_foreground] = foreground;

		var background = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.6, 0.6, 0.6, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_background] = background;

		materialMap[DSC.Framework.Asset.Gui.s_state.e_disabled] = data;
	}

	//"e_over" : 2, //rollover
	{
		var data = {};
		var foreground = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.0, 0.4, 0.0, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_foreground] = foreground;

		var background = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.4, 0.8, 0.4, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_background] = background;

		materialMap[DSC.Framework.Asset.Gui.s_state.e_over] = data;
	}

	//"e_active" : 3 //after click
	{
		var data = {};
		var foreground = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.4, 0.4, 0.0, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_foreground] = foreground;

		var background = in_framework.m_asset.NewMaterial(
			"Blend", 
			in_framework.m_context,
			{ 
				m_colour : DSC.Math.Colour.FactoryRaw(0.8, 0.8, 0.4, 1.0),
				m_frame : DSC.Math.Frame.FactoryRaw(),
				m_shaderName: "APos2UFrame4UColour4",
				m_vertexTransformHint : DSC.Framework.Asset.Material.s_vertexTransformHint.T2DFrame
			}
			);
		data[DSC.Framework.Asset.Gui.s_subState.e_background] = background;

		materialMap[DSC.Framework.Asset.Gui.s_state.e_active] = data;
	}


	return materialMap;
}

DSC.Framework.Asset.Gui.FactoryRaw = function(
	in_framework,
	_materialMap,
	_rootDrawable
	)
{
	return new DSC.Framework.Asset.Gui(
		in_framework,
		_materialMap, 
		_rootDrawable
		);
}
