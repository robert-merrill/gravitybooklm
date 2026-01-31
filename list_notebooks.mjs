
import { spawn } from 'child_process';
import { createInterface } from 'readline';

const serverProcess = spawn('bunx', ['@pan-sec/notebooklm-mcp'], {
    stdio: ['pipe', 'pipe', 'inherit'],
});

const rl = createInterface({
    input: serverProcess.stdout,
    terminal: false,
});

// Send JSON-RPC message
function send(msg) {
    const str = JSON.stringify(msg);
    serverProcess.stdin.write(str + '\n');
}

rl.on('line', (line) => {
    try {
        const msg = JSON.parse(line);
        if (msg.id === 1 && msg.result) {
            console.log('Server initialized.');
            send({ jsonrpc: '2.0', method: 'notifications/initialized' });

            console.log('Listing notebooks...');
            send({
                jsonrpc: '2.0',
                id: 2,
                method: 'tools/call',
                params: {
                    name: 'list_notebooks',
                    arguments: {}
                }
            });
        } else if (msg.id === 2) {
            if (msg.error) {
                console.error('List notebooks failed:', msg.error);
                process.exit(1);
            } else {
                console.log('Notebooks list received.');
                console.log(JSON.stringify(msg.result, null, 2));
                process.exit(0);
            }
        }
    } catch (e) {
        // Ignore
    }
});

// Start initialization
console.log('Starting initialization...');
send({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'verify-script', version: '1.0' }
    }
});
