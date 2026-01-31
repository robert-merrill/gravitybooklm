
import { spawn } from 'child_process';
import { createInterface } from 'readline';

const serverProcess = spawn('node', ['/Users/robertmerrill/code/gravitybooklm/node_modules/@pan-sec/notebooklm-mcp/dist/index.js'], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

const rl = createInterface({
  input: serverProcess.stdout,
  terminal: false,
});

function send(msg) {
  serverProcess.stdin.write(JSON.stringify(msg) + '\n');
}

rl.on('line', (line) => {
  try {
    const msg = JSON.parse(line);
    if (msg.id === 1 && msg.result) {
      send({ jsonrpc: '2.0', method: 'notifications/initialized' });

      console.log('Cleaning up old data...');
      send({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
          name: 'cleanup_data',
          arguments: { confirm: true }
        }
      });

    } else if (msg.id === 2) {
      console.log('Cleanup complete. Starting authentication...');
      send({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'setup_auth',
          arguments: { show_browser: true }
        }
      });
    } else if (msg.id === 3) {
      if (msg.error) {
        console.error('Auth failed:', msg.error);
        process.exit(1);
      } else {
        console.log('Auth succeeded:', msg.result);
        process.exit(0);
      }
    }
  } catch (e) { }
});

send({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'auth-script', version: '1.0' }
  }
});
