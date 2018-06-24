/*
do we store all uniforms as dng nodes?
*/

DSC.Framework.Context.Uniform.Collection = function(_mapUniforms)
{
	if ( !(this instanceof DSC.Framework.Context.Uniform.Collection) )
		alert("DSC.Framework.Context.Uniform.Collection: call constuctor with new keyword");
	
	this.m_mapUniforms = (undefined == _mapUniforms) ? {} : _mapUniforms;

	return;
}

//we have some standard uniform names, transforms for context
DSC.Framework.Context.Uniform.Collection.s_matrixModel = "u_matrixModel";
DSC.Framework.Context.Uniform.Collection.s_matrixView = "u_matrixView";
DSC.Framework.Context.Uniform.Collection.s_matrixProjection = "u_matrixProjection";
DSC.Framework.Context.Uniform.Collection.s_matrixMV = "u_matrixMV";
DSC.Framework.Context.Uniform.Collection.s_matrixVP = "u_matrixVP";
DSC.Framework.Context.Uniform.Collection.s_matrixMVP = "u_matrixMVP";
DSC.Framework.Context.Uniform.Collection.s_matrixIMV = "u_matrixIMV"; //inverted model view (put model at origin, for transforming camera ray)
DSC.Framework.Context.Uniform.Collection.s_projection = "u_projection"; //near, far, right, top
DSC.Framework.Context.Uniform.Collection.s_frame = "u_frame";
//uniforms for material
DSC.Framework.Context.Uniform.Collection.s_colour = "u_colour";
DSC.Framework.Context.Uniform.Collection.s_sampler = "u_sampler"; //u_sampler0, u_sampler1, u_sampler2, ... u_sampler31
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

// for context, the colour
DSC.Framework.Context.Uniform.Collection.FactoryMaterial = function()
{
	var mapUniforms = {};

	//does colour live here, or in the material uniform collection
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_colour] = 
		DSC.Framework.Context.Uniform.FactoryRaw(
			DSC.Math.Colour.Clone(undefined, DSC.Math.Colour.s_black),
			DSC.Framework.Context.Uniform.s_type.TColour4
			);

	return DSC.Framework.Context.Uniform.Collection.FactoryRaw(mapUniforms);
}

// for context, all the transforms
DSC.Framework.Context.Uniform.Collection.FactoryContext = function()
{
	var matrixModelDNG = DSC.DNG.Node.FactoryRaw(
		DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_identity)
		);
	var matrixViewlDNG = DSC.DNG.Node.FactoryRaw(
		DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_identity)
		);
	var matrixProjectionDNG = DSC.DNG.Node.FactoryRaw(
		DSC.Math.Matrix4.Clone(undefined, DSC.Math.Matrix4.s_identity)
		);

	var matrixMVDNG = DSC.DNG.Node.FactoryRaw(
		undefined,
		DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4
		);
	DSC.DNG.Container.LinkNodes(matrixMVDNG, matrixModelDNG, 1);
	DSC.DNG.Container.LinkNodes(matrixMVDNG, matrixViewlDNG, 0);

	var matrixVPDNG = DSC.DNG.Node.FactoryRaw(
		undefined,
		DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4
		);
	DSC.DNG.Container.LinkNodes(matrixVPDNG, matrixViewlDNG, 1);
	DSC.DNG.Container.LinkNodes(matrixVPDNG, matrixProjectionDNG, 0);

	var matrixMVPDNG = DSC.DNG.Node.FactoryRaw(
		undefined,
		DSC.DNG.UpdateFunction.PairMultiplyMatrix4Matrix4
		);
	DSC.DNG.Container.LinkNodes(matrixMVPDNG, matrixModelDNG, 1);
	DSC.DNG.Container.LinkNodes(matrixMVPDNG, matrixVPDNG, 0);

	var matrixIMVDNG = DSC.DNG.Node.FactoryRaw(
		undefined,
		DSC.DNG.UpdateFunction.Matrix4Invert
		);
	DSC.DNG.Container.LinkNodes(matrixIMVDNG, matrixMVDNG, 0);

	var mapUniforms = {};
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixModel] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixModelDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixView] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixViewlDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixProjection] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixProjectionDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixMV] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixMVDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixVP] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixVPDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixMVP] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixMVPDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_matrixIMV] = 
		DSC.Framework.Context.Uniform_DNG.FactoryRaw(
			matrixIMVDNG,
			DSC.Framework.Context.Uniform.s_type.TMatrix4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_projection] = 
		DSC.Framework.Context.Uniform.FactoryRaw(
			DSC.Math.Vector4.FactoryRaw(),
			DSC.Framework.Context.Uniform.s_type.TVector4
			);
	mapUniforms[DSC.Framework.Context.Uniform.Collection.s_frame] = 
		DSC.Framework.Context.Uniform.FactoryRaw(
			DSC.Math.Frame.FactoryRaw(),
			DSC.Framework.Context.Uniform.s_type.TFrame
			);

	return DSC.Framework.Context.Uniform.Collection.FactoryRaw(mapUniforms);
}

DSC.Framework.Context.Uniform.Collection.FactoryRaw = function(_mapUniforms)
{
	return new DSC.Framework.Context.Uniform.Collection(_mapUniforms);
}
