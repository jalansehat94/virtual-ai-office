"""
Live Virtual AI Office Server
Port: 8888
Serves the 3D diorama with live sync state polling and interactive dispatch.
"""

import http.server
import socketserver
import os
import json
import sys

PORT = 8888
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class LiveSyncHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_POST(self):
        if self.path == '/api/toggle':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            req = json.loads(post_data.decode('utf-8'))
            agent_id = req.get('agent_id')
            
            # Read state
            state_file = os.path.join(DIRECTORY, 'live_state.json')
            with open(state_file, 'r', encoding='utf-8') as f:
                state = json.load(f)
            
            if agent_id in state['agents']:
                current_status = state['agents'][agent_id]['status']
                new_status = 'standby' if current_status == 'working' else 'working'
                state['agents'][agent_id]['status'] = new_status
                state['agents'][agent_id]['target_floor'] = 1 if new_status == 'standby' else (3 if agent_id == 'ai' else 2)
                state['agents'][agent_id]['task'] = "Standby di Pantry" if new_status == 'standby' else "Aktif Mengerjakan Tugas"
                
                # Update counts
                working = sum(1 for a in state['agents'].values() if a['status'] == 'working')
                standby = len(state['agents']) - working
                state['counts']['working'] = working
                state['counts']['standby'] = standby
                
                with open(state_file, 'w', encoding='utf-8') as f:
                    json.dump(state, f, indent=2)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': True, 'state': state}).encode('utf-8'))
                return

        self.send_response(404)
        self.end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(('', PORT), LiveSyncHandler) as httpd:
        print(f"[OK] Live Virtual Office Server running at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
