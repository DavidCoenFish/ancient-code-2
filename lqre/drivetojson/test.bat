echo off
set errorlevel=
node main.js test
exit /B %errorlevel%
