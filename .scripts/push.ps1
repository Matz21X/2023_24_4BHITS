Set-Location "C:\Users\matth\Documents\2023_24_4BHITS"
$commitMessage = "Vault backup: $(Get-Date -Format 'dd/MM/yy HH:mm:ss') $env:COMPUTERNAME SHUTDOWN"

Write-Host "START"

git add -A
git commit -m $commitMessage
git push

Start-Sleep -Seconds 10
Write-Host "END"