const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, enum: ['buy', 'sell'] },
    user_id: { type: Number },
    symbol: { type: String },
    shares: { type: Number, required: true, min: 1, max: 100 },
    price: { type: Number},
    timestamp: { type: Number, required: true, default: Date.now}
});

tradeSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
