const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db('user');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

module.exports = { connectToDatabase };