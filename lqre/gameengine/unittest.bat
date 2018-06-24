echo.
echo unittest.bat
echo off
set errorlevel=
node unittest.js
exit /B %errorlevel%
