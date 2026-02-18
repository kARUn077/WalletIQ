const dns = require('dns').promises;
dns.setServers(['8.8.8.8', '8.8.4.4']);

const resolveAndFormat = async () => {
    const hostname = 'cluster0.zkibokk.mongodb.net';
    const srvHostname = `_mongodb._tcp.${hostname}`;
    console.log(`Resolving SRV for ${srvHostname} using Google DNS...`);

    try {
        const addresses = await dns.resolveSrv(srvHostname);
        console.log('SRV Records:', JSON.stringify(addresses, null, 2));

        const nodes = addresses.map(a => `${a.name}:${a.port}`).join(',');
        console.log('\n--- Standard Connection String (Format) ---');
        console.log(`mongodb://karunpoddar0_db_user:RzfYM8GSJPEelHgh@${nodes}/?ssl=true&authSource=admin&retryWrites=true&w=majority`);
        console.log('\nNOTE: You might still need the replicaSet name if it fails.');
    } catch (e) {
        console.error('Resolution failed even with Google DNS:', e.message);
    }
};

resolveAndFormat();
