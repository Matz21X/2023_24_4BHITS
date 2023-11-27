Set-Location "C:\Users\matth\Documents\2023_24_4BHITS\MEDT"
$commitMessage = "Vault backup: $(Get-Date -Format 'dd/MM/yy HH:mm:ss') $env:COMPUTERNAME SHUTDOWN"

git add -A
git commit -m $commitMessage
git push
if ($LASTEXITCODE -eq 0) {
    # shutdown.exe /p
} else {
    Pause
}