:: note the folder depth between 3 things is syncronised. location of bat file, source files and finial html
echo build_library_core.bat

PUSHD %CD%
CD %~dp0
:: double double colon can be used as a cheap comment when at start of line (it is a goto label)
::echo can print out comments

SET input=--js .\\..\\source\\library\\core.js

SET input=%input% --js .\\..\\source\\library\\dagnodecalculate.js
SET input=%input% --js .\\..\\source\\library\\dagnodecollection.js
SET input=%input% --js .\\..\\source\\library\\dagnodevalue.js
SET input=%input% --js .\\..\\source\\library\\gameobject.js
SET input=%input% --js .\\..\\source\\library\\gameobjectmanager.js
SET input=%input% --js .\\..\\source\\library\\instructioncontext.js
SET input=%input% --js .\\..\\source\\library\\uuid.js

SET input=%input% --js .\\..\\source\\library_lqre\\instructioncontextlqre.js

if not exist .\..\build mkdir .\..\build

:: --new_type_inf
:: --define="DEBUG=false"
:: --define="LOG=false"
java.exe -jar .\\..\\tool\\closure\\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --define="LOG=true" %input% --js_output_file .\\..\\build\\library_lqre.js --create_source_map .\\..\\build\\library_lqre.map --source_map_format=V3 --generate_exports

CD .\..\build
> temp.txt (
  echo.
  for /f "usebackq delims=" %%A in (library_lqre.js) do (
    if "%%A" equ "/*" (echo.) else (if "%%A" equ "*/" (echo.) else (echo %%A))
  )
)

::(echo //@ sourceMappingURL=fubar_core.map) > temp.txt
::type fubar_core.js >> temp.txt
move /y temp.txt library_lqre.js

POPD

