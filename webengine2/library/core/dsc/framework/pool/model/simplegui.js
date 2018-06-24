DSC.Framework.Asset.Model.Pool.SimpleGui =
{
	"m_mode" : DSC.Framework.Context.WebGL.TRIANGLES,
	"m_elementCount" : 0,
	"m_mapDataStream" : 
	{
		"a_position" : DSC.Framework.Asset.Model.DataStream.Factory(
			DSC.Framework.Context.WebGL.BYTE,
			2,
			new DSC.Common.t_s8Array([
				//pannel 0 6
				-128, -128,
				-128, 127,
				127, -128,
				127, 127, 
				127, -128,
				-128, 127,
				
				//left arrow 6 3
				-85, 0,
				65, -87,
				65, 87,

				//right arrow 9 3
				85, 0,
				-65, 87,
				-65, -87,

				//disk 12 (3x32 = 96)
				0, 0,
				0, 127,     
				24, 125,    
				0, 0,       
				24, 125,    
				48, 117,    
				0, 0,       
				48, 117,    
				70, 106,    
				0, 0,       
				70, 106,    
				90, 90,     
				0, 0,       
				90, 90,     
				106, 70,    
				0, 0,       
				106, 70,    
				117, 48,    
				0, 0,       
				117, 48,    
				125, 24,    
				0, 0,       
				125, 24,    
				127, 0,     
				0, 0,       
				127, 0,     
				125, -25,   
				0, 0,       
				125, -25,   
				117, -49,   
				0, 0,       
				117, -49,   
				106, -71,   
				0, 0,       
				106, -71,   
				90, -91,    
				0, 0,       
				90, -91,    
				70, -107,   
				0, 0,       
				70, -107,   
				48, -118,   
				0, 0,       
				48, -118,   
				24, -126,   
				0, 0,       
				24, -126,   
				0, -128,    
				0, 0,       
				0, -128,    
				-25, -126,  
				0, 0,       
				-25, -126,  
				-49, -118,  
				0, 0,       
				-49, -118,  
				-71, -107,  
				0, 0,       
				-71, -107,  
				-91, -91,   
				0, 0,       
				-91, -91,   
				-107, -71,  
				0, 0,       
				-107, -71,  
				-118, -49,  
				0, 0,       
				-118, -49,  
				-126, -25,  
				0, 0,       
				-126, -25,  
				-128, -1,   
				0, 0,       
				-128, -1,   
				-126, 24,   
				0, 0,       
				-126, 24,   
				-118, 48,   
				0, 0,       
				-118, 48,   
				-107, 70,   
				0, 0,       
				-107, 70,   
				-91, 90,    
				0, 0,       
				-91, 90,    
				-71, 106,   
				0, 0,       
				-71, 106,   
				-49, 117,   
				0, 0,       
				-49, 117,   
				-25, 125,   
				0, 0,		
				-25, 125,   
				0, 127,
				
				//small disk 108 (3x12 = 36)
				0, 0,	
				0, 63,	
				31, 55, 
				0, 0,	
				31, 55, 
				55, 31, 
				0, 0,	
				55, 31,	
				63, 0,	
				0, 0,	
				63, 0,	
				55, -32,
				0, 0,	
				55, -32,
				31, -56,
				0, 0,	
				31, -56,
				0, -64,	
				0, 0,	
				0, -64,	
				-32, -56,
				0, 0,	
				-32, -56,
				-56, -32,
				0, 0,	
				-56, -32,
				-64, -1,
				0, 0,
				-64, -1,
				-56, 31,
				0, 0,
				-56, 31,
				-32, 55,
				0, 0,	
				-32, 55,
				0, 63,				
					
				]),
				DSC.Framework.Context.WebGL.STATIC_DRAW,
				true
			),
	},
	"m_elementIndex" : undefined
}


/*
	//value = (( 2.0 * value) + 1.0) / 255.0;
	//((value * 255) - 1.0) / 2.0

	var NormalToByte = function(in_value)
	{
		return Math.round(((in_value * 255) - 1.0) / 2.0);
	};
	var segmentCount = 32;
	for (var index = 0; index < segmentCount; ++index)
	{
		var x0 = Math.sin(Math.PI*2.0*index/segmentCount);
		var x1 = Math.sin(Math.PI*2.0*(index+1)/segmentCount);
		var y0 = Math.cos(Math.PI*2.0*index/segmentCount);
		var y1 = Math.cos(Math.PI*2.0*(index+1)/segmentCount);

		console.info("\t" + NormalToByte(0.0) + ", " + NormalToByte(0.0) + ", ");
		console.info("\t" + NormalToByte(x0) + ", " + NormalToByte(y0) + ", ");
		console.info("\t" + NormalToByte(x1) + ", " + NormalToByte(y1) + ", ");
	}


*/