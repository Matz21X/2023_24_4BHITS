$sourcePath = "C:\Users\matth\Documents\2023_24_4BHITS"
$destinationPath = "C:\Users\matth\OneDrive - HTL Hollabrunn\2023_24_4BHITS"
$logFilePath = "C:\Users\matth\Documents\2023_24_4BHITS\.scripts\copyLog.txt"
$hostname = $env:COMPUTERNAME

Set-Location C:\Users\matth\Documents\2023_24_4BHITS
$gitPullOutput = git pull

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS"

    updateOneDrive



} else {
    Write-Host "ERROR: Der Git Pull-Vorgang war nicht erfolgreich."
}

Write-Host "Git Pull-Ausgabe: $gitPullOutput"





function updateOneDrive {
    Write-Host "----------ONEDRIVE UPDATE----------"
    if (Test-Path $sourcePath -PathType Container) {
        if (-not (Test-Path $destinationPath -PathType Container)) {
            New-Item -Path $destinationPath -ItemType Directory -Force
        }
    
        try {
            Copy-Item -Path "$sourcePath\*" -Destination $destinationPath -Force -Recurse -Exclude ".git"
            Write-Host "Kopieren abgeschlossen."
            
            "-------------------------------------------------" | Out-File -Append -FilePath $logFilePath
            "Kopieren abgeschlossen: $(Get-Date)" | Out-File -Append -FilePath $logFilePath
            "Hostname: $hostname" | Out-File -Append -FilePath $logFilePath
        } catch {
            Write-Host "Fehler beim Kopieren: $_"
            
            "Fehler beim Kopieren: $(Get-Date)" | Out-File -Append -FilePath $logFilePath
            $_.Exception.Message | Out-File -Append -FilePath $logFilePath
        }
    } else {
        Write-Host "Der Quellordner existiert nicht."
        
        "Der Quellordner existiert nicht: $(Get-Date)" | Out-File -Append -FilePath $logFilePath
    }

}
