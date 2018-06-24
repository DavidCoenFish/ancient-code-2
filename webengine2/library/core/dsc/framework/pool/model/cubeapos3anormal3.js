// bounds should be (-1.0 ... 1.0)
/*
	  22--23
	 /	  /
	20--21
	          11 14--15  18
	         /|  |    |  |\
	6 -- 7 10 |  |    |  | 19
	|    |  | 9  12--13  16 |
	|    |  |/            \ |
	4 -- 5  8              17
	  0 -- 1
	 /	  /
	2 -- 3

	+x
  +z/
  |/
  *--+y
*/
DSC.Framework.Asset.Model.Pool.CubeAPos3ANormal3 = 
{
	"m_mode" : DSC.Framework.Context.WebGL.TRIANGLES,
	"m_elementCount" : 36,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_s8Array([
				127, -128, -128, //c	//2
				127, 127, -128, //d	//3
				-128, -128, -128, //a	//0
				-128, 127, -128, //b	//1
		
				-128, -128, -128, //a  //4
				-128, 127, -128, //b  //5
				-128, -128, 127, //e  //6
				-128, 127, 127, //f  //7
		
				-128, 127, -128, //b  //8
				127, 127, -128, //d  //9
				-128, 127, 127, //f  //10
				127, 127, 127, //h  //11
		
				127, 127, -128, //d  //12
				127, -128, -128, //c  //13
				127, 127, 127, //h  //14
				127, -128, 127, //g  //15
		
				127, -128, -128, //c  //16
				-128, -128, -128, //a  //17
				127, -128, 127, //g  //18
				-128, -128, 127, //e  //19
		
				-128, -128, 127, //e  //20
				-128, 127, 127, //f  //21
				127, -128, 127, //g  //22
				127, 127, 127, //h  //23
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
		"a_normal" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			3,
			new DSC.Common.t_u8Array([
				0, 0, -128,
				0, 0, -128,
				0, 0, -128,
				0, 0, -128,

				-128, 0, 0,
				-128, 0, 0,
				-128, 0, 0,
				-128, 0, 0,

				0, 127, 0,
				0, 127, 0,
				0, 127, 0,
				0, 127, 0,

				127, 0, 0,
				127, 0, 0,
				127, 0, 0,
				127, 0, 0,

				0, -128, 0,
				0, -128, 0,
				0, -128, 0,
				0, -128, 0,

				0, 0, 127,
				0, 0, 127,
				0, 0, 127,
				0, 0, 127,
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : new DSC.Common.t_u8Array([
		0, 2, 1,
		1, 2, 3,

		4, 6, 5,
		5, 6, 7,

		8, 10, 9,
		9, 10, 11,

		12, 14, 13,
		13, 14, 15,

		16, 18, 17,
		17, 18, 19,

		20, 22, 21,
		21, 22, 23,
		])
}
