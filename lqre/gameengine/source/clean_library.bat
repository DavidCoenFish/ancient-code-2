PUSHD %CD%
CD %~dp0

DEL .\\..\\..\\public\\js\\fubar_core.js
DEL .\\..\\..\\public\\js\\fubar_core_map.js

POPD
EXIT 0
