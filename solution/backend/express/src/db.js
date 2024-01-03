const { MongoClient } = require('mongodb')

const connectionString = 'mongodb://localhost:27017/soccer';

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(connectionString)
        .then((client) => {
            dbConnection = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
            cb(err);
        })
    },
    getDb: () => {
        return dbConnection;
    }
}