PUSHD %CD%
CD %~dp0
CALL source\library\build_library_core_render.bat
POPD
EXIT 0
