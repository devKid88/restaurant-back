var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaderSchema = new Schema({
    name: {
        type: String,
        required:true,
        unique: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var leaders = mongoose.model('leaders', leaderSchema);

module.exports = leaders;