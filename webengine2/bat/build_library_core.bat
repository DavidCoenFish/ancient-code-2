PUSHD %CD%
CD %~dp0

:: double double colon can be used as a cheap comment 

SET input=--js .\\..\\..\\library\\core\\dsc.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\common.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\dng.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\dng\\datainterface.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\dng\\datavalue.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\dng\\datacalculate.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\dng\\functor.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\dng\\node.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\font.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\font\\letterdata.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\material.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\model.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\model\\datastream.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\shader.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\asset\\shader\\uniform.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\context.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\context2d.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\contextwebgl.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\context\\uniform.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\context\\uniform\\collection.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\context\\uniform\\dng.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\context\\webgl.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\poolinterface.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\font.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\font\\angiesnewhouse.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\font\\constructa.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\material.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\material\\default.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\model.js
::SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\model\\angiesnewhouse.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\model\\constructa.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\shader.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\shader\\apos2ucolour4.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\shader\\apos2uframe4ucolour4.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\pool\\shader\\apos2uframe4uclamp4ucolour4.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\framework\\input.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\bound2.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\colourrgb.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\colourrgba.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\matrix4.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\vector2.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\vector3.js
SET input=%input% --js .\\..\\..\\library\\core\\dsc\\math\\vector4.js

java86.exe -jar .\\..\\..\\tool\\compiler\\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS %input% --js_output_file .\\..\\..\\www\\javascript\\dsc_core.js --create_source_map .\\..\\..\\www\\javascript\\dsc_core_map.js --generate_exports

POPD
EXIT 0
