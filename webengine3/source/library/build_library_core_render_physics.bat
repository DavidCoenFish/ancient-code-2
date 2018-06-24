:: note the folder depth between 3 things is syncronised. location of bat file, source files and finial html
echo build_library_core_render_physics.bat

PUSHD %CD%
CD %~dp0

:: double double colon can be used as a cheap comment when at start of line (it is a goto label)

SET input=--js .\\..\\..\\source\\library\\render\\core.js
SET input=%input% --js .\\..\\..\\source\\library\\core\\dagnodecalculate.js
SET input=%input% --js .\\..\\..\\source\\library\\core\\dagnodecollection.js
SET input=%input% --js .\\..\\..\\source\\library\\core\\dagnodevalue.js

SET input=%input% --js .\\..\\..\\source\\library\\render\\capsulecollection.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\colourrgb.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\colourrgba.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\framework.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\math.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\matrix3.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\matrix4.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\model.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\modeldatastream.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\quaternion.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\render.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\renderdata.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\scenecamerafov.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\scenegrid.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\scenetransform.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\scenetransformorbit.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\shader.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\shaderuniform.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\texture.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\uislider.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\vector2.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\vector3.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\vector4.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\webgl.js
SET input=%input% --js .\\..\\..\\source\\library\\render\\material.js

SET input=%input% --js .\\..\\..\\source\\library\\physics\\pbody.js
SET input=%input% --js .\\..\\..\\source\\library\\physics\\pforce.js
SET input=%input% --js .\\..\\..\\source\\library\\physics\\pmanifold.js
SET input=%input% --js .\\..\\..\\source\\library\\physics\\pplane.js
SET input=%input% --js .\\..\\..\\source\\library\\physics\\pscene.js
SET input=%input% --js .\\..\\..\\source\\library\\physics\\psphere.js

if not exist .\..\..\public\js mkdir .\..\..\public\js

::--new_type_inf
:: --define="DEBUG=false"
:: --define="LOG=false"
java.exe -jar .\\..\\..\\tool\\closure\\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --define="DEBUG=true" %input% --js_output_file .\\..\\..\\public\\js\\fubar_core_render.js --create_source_map .\\..\\..\\public\\js\\fubar_core_render.map --source_map_format=V3 --generate_exports

CD .\..\..\public\js
> temp.txt (
  echo.
  for /f "usebackq delims=" %%A in (fubar_core_render.js) do (
    if "%%A" equ "/*" (echo.) else (if "%%A" equ "*/" (echo.) else (echo %%A))
  )
)

::(echo //@ sourceMappingURL=fubar_core_render.map) > temp.txt
::type fubar_core_render.js >> temp.txt
move /y temp.txt fubar_core_render.js

POPD
EXIT 0
