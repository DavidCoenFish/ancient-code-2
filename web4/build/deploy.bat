PUSHD %CD%
CD %~dp0

echo %1

echo off
C:\Users\David\AppData\Local\Programs\Python\Python35\python.exe deploy.py %1 "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"


POPD
EXIT 0
