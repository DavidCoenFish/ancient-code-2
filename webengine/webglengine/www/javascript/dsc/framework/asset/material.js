/*
for canvas 2d. 
	colour for stroke/ fill
	flag for 3d or 2d transform path
	- (fill or stroke determined by model type of data. line -> stroke. triangle -> fill)

for webgl. 
	colour for standard uniforms
	material has gles flags [depth, cull, clockwise, blend, ...]

	naming param
		default //undefined
		blend //
		depth
		blenddepth
*/

DSC.Framework.Asset.Material = function(
	_shader,
	_uniformCollection,
	_textureArray,
	_vertexTransformHint,
	_triangleCull,
	_triangleClockwise,
	_blend,
	_blendSourceFlag,
	_blendDestinationFlag,
	_depthFlag
	)
{
	if ( !(this instanceof DSC.Framework.Asset.Material) )
		alert("DSC.Framework.Asset.Material: call constuctor with new keyword");

	this.m_shader = _shader;
	this.m_uniformCollection = _uniformCollection;
	this.m_textureArray = _textureArray;

	this.m_vertexTransformHint = _vertexTransformHint;

	this.m_triangleCull = (undefined == _triangleCull) ? DSC.Framework.Asset.Material.s_triangleCull.None : _triangleCull;

	this.m_triangleClockwise = (undefined == _triangleClockwise) ? false : _triangleClockwise;

	this.m_blend = (undefined == _blend) ? false : _blend;
	this.m_blendSourceFlag = (undefined == _blendSourceFlag) ? DSC.Framework.Asset.Material.s_blendFlag.One : _blendSourceFlag;
	this.m_blendDestinationFlag = (undefined == _blendDestinationFlag) ? DSC.Framework.Asset.Material.s_blendFlag.Zero : _blendDestinationFlag;
	
	this.m_depthFlag = (undefined == _depthFlag) ? DSC.Framework.Asset.Material.s_depthTestFlag.None : _depthFlag;
	
	return;
}

// some hints for the 2d canvas as to what to do
DSC.Framework.Asset.Material.s_vertexTransformHint = 
{
	"NoDraw" : 0, //do not display this geometry
	"T2D" : 1, //clip space, points use -1 to 1 as map to viewport width, height
	"T2DFrame" : 2, //frame. transform points to viewport relative to frame
	"T3D" : 3, //MVP. transform points to viewport using MVP
	"T3DFrame" : 4, //use both MVP and frame
}

DSC.Framework.Asset.Material.s_triangleCull = 
{
	"None" : 0,
	"Front" : 1,
	"Back" : 2,
	"FrontAndBack" : 3
}

//blendColor
DSC.Framework.Asset.Material.s_blendFlag = 
{
	"Zero" : 0,
	"One" : 1,
	"SrcColor" : 2,
	"OneMinusSrcColor" : 3,
	"SrcAlpha" : 4,
	"OneMinusSrcAlpha" : 5,
	"DstAlpha" : 6,
	"OneMinusDstAlpha" : 7,
	"DstColor" : 8, //src only
	"OneMinusDstColor" : 9, //src only
	"SrcAlphaSaturate" : 10 //src only
}

DSC.Framework.Asset.Material.BlendFlagToWebGL = function(in_blendFlag)
{
	switch (in_blendFlag)
	{
	default:
		break;
	case DSC.Framework.Asset.Material.s_blendFlag.Zero:
		return DSC.Framework.Context.WebGL.ZERO;
	case DSC.Framework.Asset.Material.s_blendFlag.One:
		return DSC.Framework.Context.WebGL.ONE;
	case DSC.Framework.Asset.Material.s_blendFlag.SrcColor:
		return DSC.Framework.Context.WebGL.SRC_COLOR;
	case DSC.Framework.Asset.Material.s_blendFlag.OneMinusSrcColor:
		return DSC.Framework.Context.WebGL.ONE_MINUS_SRC_COLOR;
	case DSC.Framework.Asset.Material.s_blendFlag.SrcAlpha:
		return DSC.Framework.Context.WebGL.SRC_ALPHA;
	case DSC.Framework.Asset.Material.s_blendFlag.OneMinusSrcAlpha:
		return DSC.Framework.Context.WebGL.ONE_MINUS_SRC_ALPHA;
	case DSC.Framework.Asset.Material.s_blendFlag.DstAlpha:
		return DSC.Framework.Context.WebGL.DST_ALPHA;
	case DSC.Framework.Asset.Material.s_blendFlag.OneMinusDstAlpha:
		return DSC.Framework.Context.WebGL.ONE_MINUS_DST_ALPHA;
	case DSC.Framework.Asset.Material.s_blendFlag.DstColor:
		return DSC.Framework.Context.WebGL.DST_COLOR;
	case DSC.Framework.Asset.Material.s_blendFlag.OneMinusDstColor:
		return DSC.Framework.Context.WebGL.ONE_MINUS_DST_COLOR;
	case DSC.Framework.Asset.Material.s_blendFlag.SrcAlphaSaturate:
		return DSC.Framework.Context.WebGL.SRC_ALPHA_SATURATE;
	}

	return -1;
}

DSC.Framework.Asset.Material.s_depthTestFlag = 
{
	"None" : 0,
	"Less" : 1,
	"LessOrEqual" : 2,
	"Greater" : 3,
	"Always" : 4
}

DSC.Framework.Asset.Material.FactoryRaw = function(
	_shader, //for webgl
	_uniformCollection, //colour
	_textureArray,
	_vertexTransformHint, //mostly for 2d, hint for vertex transform emulation
	_triangleCull,
	_triangleClockwise,
	_blend,
	_blendSourceFlag,
	_blendDestinationFlag,
	_depthFlag
	)
{
	return new DSC.Framework.Asset.Material(
		_shader,
		_uniformCollection,
		_textureArray,
		_vertexTransformHint,
		_triangleCull,
		_triangleClockwise,
		_blend,
		_blendSourceFlag,
		_blendDestinationFlag,
		_depthFlag
		);
}
