PUSHD %CD%
CD %~dp0
CALL source\library\build_library_core.bat
POPD
EXIT 0
