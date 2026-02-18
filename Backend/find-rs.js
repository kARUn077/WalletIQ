const { MongoClient } = require('mongodb');
require('dotenv').config();

const findReplicaSet = async () => {
    // We already know one node name
    const node = 'cluster0-shard-00-00.zkibokk.mongodb.net:27017';
    // Use standard mongodb:// (no +srv) to connect to a single node
    const baseUri = process.env.MONGO_URL.replace('mongodb+srv://', 'mongodb://');
    const singleNodeUri = baseUri.replace(/@[^/?#]+/, `@${node}`) + '&directConnection=true';

    console.log('Attempting to connect to single node:', node);
    const client = new MongoClient(singleNodeUri);

    try {
        await client.connect();
        const isMaster = await client.db().admin().command({ isMaster: 1 });
        console.log('Replica Set Name:', isMaster.setName);

        const nodes = isMaster.hosts.join(',');
        console.log('\n--- CORRECT STANDARD CONNECTION STRING ---');
        const finalUri = baseUri.replace(/@[^/?#]+/, `@${nodes}`) + `&replicaSet=${isMaster.setName}&authSource=admin&ssl=true`;
        console.log(finalUri);

    } catch (e) {
        console.error('Failed to connect to single node:', e.message);
    } finally {
        await client.close();
    }
};

findReplicaSet();
