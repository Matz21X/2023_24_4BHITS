@echo off
cd /d "C:\Users\matth\Documents\2023_24_4BHITS"
set commitMessage=Vault backup: %date:~0,2%/%date:~3,2%/%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2% %COMPUTERNAME% SHUTDOWN
set logFilePath=C:\Users\matth\Documents\2023_24_4BHITS\.scripts\pushLog.txt

echo START
echo START >> %logFilePath%
git add -A
echo git add -A
echo git add -A >> %logFilePath%
git commit -m "%commitMessage%"
echo git commit -m "%commitMessage%"
echo git commit -m "%commitMessage%" >> %logFilePath%
git push
echo git push
echo git push >> %logFilePath%

ping -n 10 127.0.0.1 > nul
echo Write-Host END >> %logFilePath%
echo END
