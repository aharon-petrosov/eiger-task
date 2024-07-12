const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const ConnectionBase = require('./connection-base');
const Trades = require('../models/trades');
mongoose.Promise = Promise;

const connect = (promise) => {
    return MongoMemoryServer.create()
        .then((m) => {
            const mongoUri = m.getUri()
            const mongooseOpts = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            mongoose.connect(mongoUri, mongooseOpts);

            mongoose.connection.on('error', (e) => {
                console.log({e})
                promise = null;
                if (e.message.code === 'ETIMEDOUT') {
                    console.log(e);
                    mongoose.connect(mongoUri, mongooseOpts);
                }
                console.log(e);
            });

            mongoose.connection.once('open', () => {
                promise = null;
                console.log(`MongoDB successfully connected to ${mongoUri}`);
            });

            return mongoose;
        });
}

class MongooseConnection extends ConnectionBase {

    getConnection() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = connect(this.promise)
            .then(connection => {
                this.connection = connection;
                return connection;
            });
        return this.promise
    }

    async clearDatabase() {
        return Trades.deleteMany();
    }

    async closeConnection() {
        return this.connection.connection.close();
    }
}

module.exports = MongooseConnection;
