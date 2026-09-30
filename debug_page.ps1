$proc = Start-Process 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -ArgumentList '--headless', '--remote-debugging-port=9226', 'http://localhost:4173/virtual-ai-office/' -PassThru
Start-Sleep -Seconds 2
$tabs = Invoke-RestMethod 'http://localhost:9226/json'
$target = $tabs | Where-Object { $_.url -match 'virtual-ai-office' } | Select-Object -First 1

if ($target) {
    Write-Host "Target WS: $($target.webSocketDebuggerUrl)"
    node "d:\SecondBrain\01_knowledge\projects\virtual_ai_office\read_console.mjs" "$($target.webSocketDebuggerUrl)"
} else {
    Write-Host "Target page not found!"
}

Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
