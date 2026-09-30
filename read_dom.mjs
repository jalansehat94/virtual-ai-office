const wsUrl = process.argv[2];
const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
  ws.send(JSON.stringify({ id: 2, method: "Page.enable" }));
  
  // Inject error trap before reload
  ws.send(JSON.stringify({
    id: 3,
    method: "Page.addScriptToEvaluateOnNewDocument",
    params: {
      source: `
        window.__errors = [];
        window.addEventListener('error', e => window.__errors.push({ msg: e.message, src: e.filename, lineno: e.lineno, colno: e.colno, error: e.error ? e.error.stack : null }));
        window.addEventListener('unhandledrejection', e => window.__errors.push({ msg: 'Promise rejected: ' + e.reason }));
      `
    }
  }));

  ws.send(JSON.stringify({ id: 4, method: "Page.reload" }));

  setTimeout(() => {
    ws.send(JSON.stringify({
      id: 20,
      method: "Runtime.evaluate",
      params: {
        expression: "JSON.stringify({ errors: window.__errors, html: document.body.innerHTML.slice(0, 300) })"
      }
    }));
  }, 2000);
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id === 20) {
    console.log("PAGE TRAP INFO:", msg.result.result.value);
  }
};

setTimeout(() => {
  ws.close();
  process.exit(0);
}, 3500);
