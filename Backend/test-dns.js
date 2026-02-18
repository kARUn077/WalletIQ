const dns = require('dns').promises;

const testDns = async () => {
    const hostname = '_mongodb._tcp.cluster0.zkibokk.mongodb.net';
    console.log(`Resolving SRV for ${hostname}...`);
    try {
        const addresses = await dns.resolveSrv(hostname);
        console.log('SUCCESS: Resolved SRV addresses:', addresses);
    } catch (error) {
        console.error('FAILURE: Could not resolve SRV record.');
        console.error(error);
    }

    const host = 'cluster0.zkibokk.mongodb.net';
    console.log(`Resolving A record for ${host}...`);
    try {
        const addresses = await dns.resolve4(host);
        console.log('SUCCESS: Resolved A addresses:', addresses);
    } catch (error) {
        console.error('FAILURE: Could not resolve A record.');
        console.error(error);
    }
};

testDns();
