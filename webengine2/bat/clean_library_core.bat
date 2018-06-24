PUSHD %CD%
CD %~dp0

DEL .\\..\\..\\www\\javascript\\dsc_core.js
DEL .\\..\\..\\www\\javascript\\dsc_core_map.js

POPD
EXIT 0
