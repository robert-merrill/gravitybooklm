
import { spawn } from 'child_process';
import { createInterface } from 'readline';

const serverProcess = spawn('bunx', ['@pan-sec/notebooklm-mcp'], {
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
            console.log('Syncing library...');
            send({
                jsonrpc: '2.0',
                id: 2,
                method: 'tools/call',
                params: { name: 'sync_library', arguments: {} }
            });
        } else if (msg.id === 2) {
            if (msg.error) {
                console.error('Sync failed:', msg.error);
            } else {
                console.log('Sync complete.');
            }
            console.log('Listing notebooks...');
            send({
                jsonrpc: '2.0',
                id: 3,
                method: 'tools/call',
                params: { name: 'list_notebooks', arguments: {} }
            });
        } else if (msg.id === 3) {
            if (msg.error) {
                console.error('List failed:', msg.error);
            } else {
                console.log('Notebooks:', JSON.stringify(msg.result, null, 2));
            }
            process.exit(0);
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
        clientInfo: { name: 'sync-script', version: '1.0' }
    }
});
