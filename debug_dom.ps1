$proc = Start-Process 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -ArgumentList '--headless', '--remote-debugging-port=9227', 'http://localhost:4173/virtual-ai-office/' -PassThru
Start-Sleep -Seconds 2
$tabs = Invoke-RestMethod 'http://localhost:9227/json'
$target = $tabs | Where-Object { $_.url -match 'virtual-ai-office' } | Select-Object -First 1

if ($target) {
    Write-Host "Target URL: $($target.url)"
    node "d:\SecondBrain\01_knowledge\projects\virtual_ai_office\read_dom.mjs" "$($target.webSocketDebuggerUrl)"
} else {
    Write-Host "Tab not found"
}

Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
