require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns').promises;
const net = require('net');

const checkConnectivity = async () => {
    console.log('--- WalletIQ Backend Diagnostics ---');
    console.log('Local Time:', new Date().toLocaleString());

    // 1. Check Env
    const url = process.env.MONGO_URL;
    if (!url) {
        console.error('❌ Error: MONGO_URL not found in .env');
        return;
    }
    console.log('✅ MONGO_URL found in .env');

    // 2. Extract Hostname
    let hostname = '';
    try {
        const matches = url.match(/@([^/]+)/);
        if (matches) hostname = matches[1].split(',')[0];
        console.log('🔍 Extracted Hostname:', hostname);
    } catch (e) {
        console.error('❌ Error: Could not parse hostname from MONGO_URL');
        return;
    }

    // 3. DNS Resolution
    console.log('\n--- Step 1: DNS Resolution ---');
    try {
        const srvHostname = `_mongodb._tcp.${hostname}`;
        const addresses = await dns.resolveSrv(srvHostname);
        console.log('✅ DNS SRV Resolution: Success');
        console.log('Found nodes:', addresses.map(a => `${a.name}:${a.port}`).join(', '));

        // Use the first resolved node for port checking
        const firstNode = addresses[0].name;

        // 4. Port Connectivity
        console.log('\n--- Step 2: Port Connectivity (27017) ---');
        console.log(`Checking connection to ${firstNode}:27017...`);

        const socket = new net.Socket();
        const start = Date.now();

        socket.setTimeout(5000);
        socket.on('connect', () => {
            console.log(`✅ Connection Success: Reached port 27017 in ${Date.now() - start}ms`);
            socket.destroy();
            finalize(true);
        }).on('timeout', () => {
            console.error('❌ Connection Timeout: Port 27017 is unreachable (Firewall or ISP block)');
            socket.destroy();
            finalize(false);
        }).on('error', (err) => {
            console.error('❌ Connection Refused:', err.message);
            finalize(false);
        }).connect(27017, firstNode);

    } catch (error) {
        console.error('❌ DNS Resolution Failed:', error.message);
        console.log('Tip: Try changing your computer DNS to 8.8.8.8 (Google DNS)');
    }
};

const finalize = (success) => {
    console.log('\n--- Final Verdict ---');
    if (success) {
        console.log('🚀 Everything looks good! Connection should work.');
    } else {
        console.log('⚠️  Network Blocked: Please add "0.0.0.0/0" to your MongoDB Atlas Network Access.');
    }
    console.log('------------------------------------');
};

checkConnectivity();
