$sourcePath = "C:\Users\matth\Documents\2023_24_4BHITS"
$destinationPath = "C:\Users\matth\OneDrive - HTL Hollabrunn\2023_24_4BHITS"
Set-Location "C:\Users\matth\Documents\2023_24_4BHITS"

function UpdateOneDrive {
    Write-Host "----------ONEDRIVE UPDATE----------"
    if (Test-Path $sourcePath -PathType Container) {
        if (-not (Test-Path $destinationPath -PathType Container)) {
            New-Item -Path $destinationPath -ItemType Directory -Force
        }
    
        try {
            Copy-Item -Path "$sourcePath\*" -Destination $destinationPath -Force -Recurse -Exclude ".git"
            Write-Host "Kopieren abgeschlossen."
            
        } catch {
            Write-Host "Fehler beim Kopieren: $_"
        }
    } else {
        Write-Host "Der Quellordner existiert nicht."
    }
}

function Test-InternetConnection {
    $ErrorActionPreference = "Stop"
    try {
        $pingResult = Test-Connection -ComputerName "www.google.com" -Count 1 -ErrorAction SilentlyContinue
        if ($null -ne $pingResult) {
            Write-Host "Internet is reachable."
            return $true
        } else {
            Write-Host "Internet is not reachable."
            return $false
        }
    } catch {
        Write-Host "Internet is not reachable."
        return $false
    }
}

function GitPull {
    $gitPullOutput = git pull
    if ($LASTEXITCODE -eq 0) {
    Write-Host "Git Pull-Ausgabe: $gitPullOutput"
    UpdateOneDrive
} else {
    Write-Host "ERROR: Der Git Pull-Vorgang war nicht erfolgreich."
    Write-Host "Git Pull-Ausgabe: $gitPullOutput"
    Pause
}

}
if (Test-InternetConnection) {
    Write-Host "Bruh"
    GitPull
} else {
    Write-Host "Cannot perform tasks that require an internet connection."
    Pause
}