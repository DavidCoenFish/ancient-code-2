:: note the folder depth between 3 things is syncronised. location of bat file, source files and finial html
echo build_library_core.bat

PUSHD %CD%
CD %~dp0
:: double double colon can be used as a cheap comment when at start of line (it is a goto label)
::echo can print out comments

SET input=--js .\\..\\..\\source\\library\\core\\core.js
SET input=%input% --js .\\..\\..\\source\\library\\core\\dagnodecalculate.js
SET input=%input% --js .\\..\\..\\source\\library\\core\\dagnodecollection.js
SET input=%input% --js .\\..\\..\\source\\library\\core\\dagnodevalue.js

if not exist .\..\..\public\js mkdir .\..\..\public\js

:: --new_type_inf
:: --define="DEBUG=false"
:: --define="LOG=false"
java.exe -jar .\\..\\..\\tool\\closure\\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --define="DEBUG=true" %input% --js_output_file .\\..\\..\\public\\js\\fubar_core.js --create_source_map .\\..\\..\\public\\js\\fubar_core.map --source_map_format=V3 --generate_exports

CD .\..\..\public\js
> temp.txt (
  echo.
  for /f "usebackq delims=" %%A in (fubar_core.js) do (
    if "%%A" equ "/*" (echo.) else (if "%%A" equ "*/" (echo.) else (echo %%A))
  )
)

::(echo //@ sourceMappingURL=fubar_core.map) > temp.txt
::type fubar_core.js >> temp.txt
move /y temp.txt fubar_core.js

POPD
EXIT 0
