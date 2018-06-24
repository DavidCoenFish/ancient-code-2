PUSHD %CD%
CD %~dp0
CALL source\library\build_library_core_render_physics.bat
POPD
EXIT 0
