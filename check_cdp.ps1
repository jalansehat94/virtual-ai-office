$ErrorActionPreference = 'SilentlyContinue'
$proc = Start-Process 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -ArgumentList '--headless', '--remote-debugging-port=9225', 'http://localhost:4173/virtual-ai-office/' -PassThru
Start-Sleep -Seconds 3
$tabs = Invoke-RestMethod 'http://localhost:9225/json'
Write-Host "Tabs found: $($tabs.Count)"
foreach ($t in $tabs) {
    Write-Host "Title: $($t.title)"
    Write-Host "URL:   $($t.url)"
    Write-Host "WS:    $($t.webSocketDebuggerUrl)"
}
Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
