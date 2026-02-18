const mongoose = require('mongoose');

const testStandardUri = async () => {
    // Constructing standard URI from previous DNS resolution
    const nodes = [
        'ac-zkibokk-shard-00-00.zkibokk.mongodb.net:27017',
        'ac-zkibokk-shard-00-01.zkibokk.mongodb.net:27017',
        'ac-zkibokk-shard-00-02.zkibokk.mongodb.net:27017'
    ].join(',');

    const uri = `mongodb://karunpoddar0_db_user:RzfYM8GSJPEelHgh@${nodes}/?ssl=true&replicaSet=atlas-cc5u8c-shard-0&authSource=admin&retryWrites=true&w=majority`;

    console.log('Testing Standard Connection String (Non-SRV):');
    console.log('URI:', uri);

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
        console.log('✅ SUCCESS: Connected to MongoDB with standard string!');
        process.exit(0);
    } catch (e) {
        console.error('❌ FAILURE: Still could not connect.');
        console.error('Error:', e.message);
        process.exit(1);
    }
};

testStandardUri();
