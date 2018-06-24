/*
do we store all uniforms as dng nodes?
*/

/**
 * @private
 * @constructor
 * @struct
 * @param {!(number|Object)} _mapUniforms
 */
DSC.Framework.Context.Uniform.Collection = function(_mapUniforms)
{
	if ( !(this instanceof DSC.Framework.Context.Uniform.Collection) )
		alert("DSC.Framework.Context.Uniform.Collection: call constuctor with new keyword");
	
	this.m_mapUniforms = (undefined == _mapUniforms) ? {} : _mapUniforms;

	return;
}
DSC.Framework.Context.Uniform['Collection'] = DSC.Framework.Context.Uniform.Collection;


//we have some standard uniform names, transforms for context
DSC.Framework.Context.Uniform.Collection.s_matrixModel = "u_matrixModel";
DSC.Framework.Context.Uniform.Collection['s_matrixModel'] = DSC.Framework.Context.Uniform.Collection.s_matrixModel;

DSC.Framework.Context.Uniform.Collection.s_matrixView = "u_matrixView";
DSC.Framework.Context.Uniform.Collection['s_matrixView'] = DSC.Framework.Context.Uniform.Collection.s_matrixView;

DSC.Framework.Context.Uniform.Collection.s_matrixProjection = "u_matrixProjection";
DSC.Framework.Context.Uniform.Collection['s_matrixProjection'] = DSC.Framework.Context.Uniform.Collection.s_matrixProjection;

DSC.Framework.Context.Uniform.Collection.s_matrixMV = "u_matrixMV";
DSC.Framework.Context.Uniform.Collection['s_matrixMV'] = DSC.Framework.Context.Uniform.Collection.s_matrixMV;

DSC.Framework.Context.Uniform.Collection.s_matrixVP = "u_matrixVP";
DSC.Framework.Context.Uniform.Collection['s_matrixVP'] = DSC.Framework.Context.Uniform.Collection.s_matrixVP;

DSC.Framework.Context.Uniform.Collection.s_matrixMVP = "u_matrixMVP";
DSC.Framework.Context.Uniform.Collection['s_matrixMVP'] = DSC.Framework.Context.Uniform.Collection.s_matrixMVP;

DSC.Framework.Context.Uniform.Collection.s_matrixIMV = "u_matrixIMV"; //inverted model view (put model at origin, for transforming camera ray)
DSC.Framework.Context.Uniform.Collection['s_matrixIMV'] = DSC.Framework.Context.Uniform.Collection.s_matrixIMV;

DSC.Framework.Context.Uniform.Collection.s_projection = "u_projection"; //near, far, right, top
DSC.Framework.Context.Uniform.Collection['s_projection'] = DSC.Framework.Context.Uniform.Collection.s_projection;

//vec4 [lowX, lowY, sizeX, sizeY]
DSC.Framework.Context.Uniform.Collection.s_frame = "u_frame";
DSC.Framework.Context.Uniform.Collection['s_frame'] = DSC.Framework.Context.Uniform.Collection.s_frame;

//bounds2 [lowX, lowY, highX, highY]
DSC.Framework.Context.Uniform.Collection.s_clamp = "u_clamp";
DSC.Framework.Context.Uniform.Collection['s_clamp'] = DSC.Framework.Context.Uniform.Collection.s_clamp;

//uniforms for material
DSC.Framework.Context.Uniform.Collection.s_colour = "u_colour";
DSC.Framework.Context.Uniform.Collection['s_colour'] = DSC.Framework.Context.Uniform.Collection.s_colour;

DSC.Framework.Context.Uniform.Collection.s_sampler = "u_sampler"; //u_sampler0, u_sampler1, u_sampler2, ... u_sampler31
DSC.Framework.Context.Uniform.Collection['s_sampler'] = DSC.Framework.Context.Uniform.Collection.s_sampler;

//u_sampler

DSC.Framework.Context.Uniform.Collection.prototype.SetUniform = function(in_name, in_value)
{
	if (in_name in this.m_mapUniforms)
	{
		this.m_mapUniforms[in_name].SetValue(in_value);
	}
}

DSC.Framework.Context.Uniform.Collection.prototype.GetUniform = function(in_name)
{
	if (in_name in this.m_mapUniforms)
	{
		return this.m_mapUniforms[in_name].GetValue();
	}
	return undefined;
}

DSC.Framework.Context.Uniform.Collection.prototype.GetUniformType = function(in_name)
{
	if (in_name in this.m_mapUniforms)
	{
		return this.m_mapUniforms[in_name].m_type;
	}
	return undefined;
}

DSC.Framework.Context.Uniform.Collection.prototype.AddUniform = function(in_name, in_uniform)
{
	this.m_mapUniforms[in_name] = in_uniform;
	return;
}

/**
 * for context, the material
 * @return {!DSC.Framework.Context.Uniform.Collection}
 */
DSC.Framework.Context.Uniform.Collection.FactoryMaterial = function()
{
	var mapUniforms = {};

	//does colour live here, or in the material uniform collection
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_colour] = 
		DSC.Framework.Context.Uniform.Factory(
			DSC.Math.ColourRGBA.s_black,
			DSC.Framework.Context.Uniform.s_type.TColour4
			);

	return DSC.Framework.Context.Uniform.Collection.Factory(mapUniforms);
}


/**
 * for context, all the transforms
 * @return {!DSC.Framework.Context.Uniform.Collection}
 */
DSC.Framework.Context.Uniform.Collection.FactoryContext = function()
{
	var matrixModelDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataValue.Factory(
			DSC.Math.Matrix4.Clone(DSC.Math.Matrix4.s_identity), 
			DSC.DNG.Functor.MakeDefaultValueAsString("matrixModel")
			)
		);
	var matrixViewlDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataValue.Factory(
			DSC.Math.Matrix4.Clone(DSC.Math.Matrix4.s_identity), 
			DSC.DNG.Functor.MakeDefaultValueAsString("matrixView")
			)
		);
	var matrixProjectionDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataValue.Factory(
			DSC.Math.Matrix4.Clone(DSC.Math.Matrix4.s_identity), 
			DSC.DNG.Functor.MakeDefaultValueAsString("matrixProjection")
			)
		);

	var matrixMVDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataCalculate.Factory(
			DSC.DNG.Functor.PairMultiplyMatrix4Matrix4,
			DSC.DNG.Functor.MakeDefaultCalculateAsString("matrixMV")
			)
		);
	matrixMVDNG.AttachInput(0, matrixViewlDNG);
	matrixMVDNG.AttachInput(1, matrixModelDNG);

	var matrixVPDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataCalculate.Factory(
			DSC.DNG.Functor.PairMultiplyMatrix4Matrix4,
			DSC.DNG.Functor.MakeDefaultCalculateAsString("matrixVP")
			)
		);
	matrixVPDNG.AttachInput(0, matrixProjectionDNG);
	matrixVPDNG.AttachInput(1, matrixViewlDNG);

	var matrixMVPDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataCalculate.Factory(
			DSC.DNG.Functor.PairMultiplyMatrix4Matrix4,
			DSC.DNG.Functor.MakeDefaultCalculateAsString("matrixMVP")
			)
		);
	matrixMVPDNG.AttachInput(0, matrixVPDNG);
	matrixMVPDNG.AttachInput(1, matrixModelDNG);

	var matrixIMVDNG = DSC.DNG.Node.Factory(
		DSC.DNG.DataCalculate.Factory(
			DSC.DNG.Functor.Matrix4Invert,
			DSC.DNG.Functor.MakeDefaultCalculateAsString("matrixIMV")
			)
		);
	matrixIMVDNG.AttachInput(0, matrixMVDNG);

	var mapUniforms = {};
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixModel] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixModelDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixView] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixViewlDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixProjection] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixProjectionDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixMV] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixMVDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixVP] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixVPDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixMVP] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixMVPDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixIMV] = 
		DSC.Framework.Context.Uniform.DNG.Factory(
			matrixIMVDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_projection] = 
		DSC.Framework.Context.Uniform.Factory(
			DSC.Math.Vector4.Factory(),
			DSC.Framework.Context.Uniform.s_type.TVector4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_frame] = 
		DSC.Framework.Context.Uniform.Factory(
			DSC.Math.Bound2.Factory(),
			DSC.Framework.Context.Uniform.s_type.TFrame
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_clamp] = 
		DSC.Framework.Context.Uniform.Factory(
			DSC.Math.Bound2.Factory(),
			DSC.Framework.Context.Uniform.s_type.TFrame
			);

	return DSC.Framework.Context.Uniform.Collection.Factory(mapUniforms);
}


/**
 * @param {!Object=} _mapUniforms
 * @return {!DSC.Framework.Context.Uniform.Collection}
 */
DSC.Framework.Context.Uniform.Collection.Factory = function(_mapUniforms)
{
	return new DSC.Framework.Context.Uniform.Collection(_mapUniforms);
}
