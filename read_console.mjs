// Read console errors via CDP WebSocket
const wsUrl = process.argv[2];
if (!wsUrl) {
  console.error("Missing wsUrl");
  process.exit(1);
}

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log("Connected to CDP!");
  ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
  ws.send(JSON.stringify({ id: 2, method: "Log.enable" }));
  ws.send(JSON.stringify({ id: 3, method: "Page.enable" }));
  ws.send(JSON.stringify({ id: 4, method: "Page.reload" }));
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.method === "Runtime.exceptionThrown") {
    console.error("EXCEPTION:", JSON.stringify(msg.params.exceptionDetails, null, 2));
  }
  if (msg.method === "Runtime.consoleAPICalled") {
    console.log("CONSOLE:", msg.params.type, msg.params.args.map(a => a.value || a.description).join(" "));
  }
};

setTimeout(() => {
  ws.close();
  process.exit(0);
}, 4000);
