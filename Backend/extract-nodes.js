const { MongoClient } = require('mongodb');
require('dotenv').config();

const extractNodes = async () => {
    const uri = process.env.MONGO_URL;
    console.log('Parsing URI:', uri);
    try {
        const client = new MongoClient(uri);
        // The internal connection string parser will try to resolve SRV
        console.log('Connection options:', client.options);

        // Let's try to get nodes from the SRV resolution manually if possible
        const dns = require('dns').promises;
        const hostname = uri.match(/@([^/?#]+)/)[1];
        const srvRecord = `_mongodb._tcp.${hostname}`;

        console.log(`Resolving SRV for ${srvRecord}...`);
        const addresses = await dns.resolveSrv(srvRecord);
        console.log('Found nodes via SRV:', addresses.map(a => `${a.name}:${a.port}`));
    } catch (e) {
        console.error('Error during extraction:', e.message);
    }
};

extractNodes();
