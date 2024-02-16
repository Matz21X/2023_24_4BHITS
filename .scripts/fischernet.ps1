$logfile = "C:\Users\matth\Documents\2023_24_4BHITS\.scripts\net.log"
$destination = "8.8.8.8"

while($true) {
    $pingResult = Test-Connection -ComputerName $destination -Count 1 -Quiet
    if (-not $pingResult) {
        $currentTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Add-Content -Path $logfile -Value "Ping fehlgeschlagen um $currentTime"
    }
    echo $pingResult
	Start-Sleep -Seconds 5
}
