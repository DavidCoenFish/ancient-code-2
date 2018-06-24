/*
*/

/**
 * @private
 * @final
 * @constructor
 * @this {!c.SceneGrid}
 * @return {undefined}
 */
c.SceneGrid = function() {
	return;
}
c["SceneGrid"] = c.SceneGrid;

/**
 * @param {!Array<!{Render:function(!c.Render):undefined}>} inout_arrayRenderlist
 * @param {!(c.DagNodeValue|c.DagNodeCalculate)} in_matrixVP
 * @param {!c.Render} in_render
 * @return {undefined}
 */
c.SceneGrid.Factory = function(
	inout_arrayRenderlist,
	in_matrixVP,
	in_render
	){

	var vertextShader = "\
attribute vec3 a_pos;\
attribute vec4 a_col;\
uniform mat4 u_matrixMVP;\
varying vec4 v_col;\
void main() {\
	gl_Position = (u_matrixMVP*vec4(a_pos.xyz, 1.0));\
	v_col = a_col;\
}";

	var fragmentShader = "\
precision mediump float;\
uniform vec4 u_colour;\
varying vec4 v_col;\
void main() {\
		gl_FragColor = v_col;\
}";

	var shader = in_render.NewShader(
		vertextShader,
		fragmentShader,
		{ 
			"a_pos": null,
			"a_col": null,
		}, 
		{ 
			"u_matrixMVP" : null,
		}
	);
	if (null === shader){
		return;
	}

	material = c.Material.Factory(
		shader,
		{ 
			"u_matrixMVP" : c.ShaderUniform.Factory(
				c.ShaderUniform.s_type.Float16,
				in_matrixVP
				),
		}
	);

	model = in_render.NewModel(
		c.WebGL.LINES,
		22, 
		{
			"a_pos" : c.ModelDataStream.Factory(
				c.WebGL.BYTE,
				3,
				new Int8Array([
					-50, 0, -100,
					-50, 0, 100,

					50, 0, -100,
					50, 0, 100,

					-100, 0, -50,
					100, 0, -50,

					-100, 0, 50,
					100, 0, 50,

					-100, 0, -100,
					-100, 0, 100,

					-100, 0, 100,
					100, 0, 100,

					100, 0, 100,
					100, 0, -100,

					100, 0, -100,
					-100, 0, -100,

					0, -50, 0,
					0, 50, 0,

					0, 0, -100,
					0, 0, 100,

					-100, 0, 0,
					100, 0, 0,

					]),
				c.WebGL.STATIC_DRAW,
				false
				),
			"a_col" : c.ModelDataStream.Factory(
				c.WebGL.UNSIGNED_BYTE,
				4,
				new Uint8Array([
					64, 64, 64, 255,
					64, 64, 64, 255,
					64, 64, 64, 255,
					64, 64, 64, 255,
					64, 64, 64, 255,
					64, 64, 64, 255,
					64, 64, 64, 255,
					64, 64, 64, 255,

					128, 128, 128, 255,
					128, 128, 128, 255,
					128, 128, 128, 255,
					128, 128, 128, 255,
					128, 128, 128, 255,
					128, 128, 128, 255,
					128, 128, 128, 255,
					128, 128, 128, 255,

					0, 0, 0, 255,
					0, 0, 0, 255,
					0, 0, 0, 255,
					0, 0, 0, 255,
					0, 0, 0, 255,
					0, 0, 0, 255
					]),
				c.WebGL.STATIC_DRAW,
				true
				),
		}
	);

	if ((null === material) || (null === model)){
		return;
	}

	inout_arrayRenderlist.push(c.RenderData.Factory(model, material));

	return;
}
c.SceneGrid["Factory"] = c.SceneGrid.Factory;
