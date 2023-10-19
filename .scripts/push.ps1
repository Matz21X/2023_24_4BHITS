Set-Location "C:\Users\matth\Documents\2023_24_4BHITS"
$commitMessage = "Vault backup: $(Get-Date -Format 'dd/MM/yy HH:mm:ss') $env:COMPUTERNAME SHUTDOWN"
$logFilePath = "C:\Users\matth\Documents\2023_24_4BHITS\.scripts\pushLog.txt"

Write-Host "START"
"START" | Out-File -Append -FilePath $logFilePath
git add -A
"git add -A" | Out-File -Append -FilePath $logFilePath
git commit -m $commitMessage
"git commit -m $commitMessage" | Out-File -Append -FilePath $logFilePath
git push
"git push" | Out-File -Append -FilePath $logFilePath


Start-Sleep -Seconds 10
"Write-Host END" | Out-File -Append -FilePath $logFilePath
Write-Host "END"
