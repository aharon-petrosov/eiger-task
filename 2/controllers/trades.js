const Trade = require('../models/trades');

let currentTradeId = 1;

const createTrade = async (req, res) => {
    try {
        const { type, user_id, symbol, shares, price, timestamp } = req.body;

        if (shares < 1 || shares > 100 || (type !== 'buy' && type !== 'sell')) {
            return res.status(400).send({ error: 'Invalid input' });
        }

        const trade = new Trade({
            id: currentTradeId++,
            type,
            user_id,
            symbol,
            shares,
            price,
            timestamp
        });

        await trade.save();

        res.status(201).send(trade);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


const getTrades = async (req, res) => {
    try {
        const { type, user_id } = req.query;
        const query = {};

        if (type) {
            query.type = type;
        }

        if (user_id) {
            query.user_id = user_id;
        }

        const trades = await Trade.find(query).sort({ id: 1 });

        res.status(200).send(trades);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getTradeById = async (req, res) => {
    try {
        const trade = await Trade.findOne({ id: req.params.id });

        if (!trade) {
            return res.status(404).send( 'ID not found');
        }

        res.status(200).send(trade);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const modifyTrade = async (req, res) => {
    return res.status(405).send({ error: 'Method Not Allowed' });
}

module.exports = {
    createTrade,
    modifyTrade,
    getTrades,
    getTradeById
};
