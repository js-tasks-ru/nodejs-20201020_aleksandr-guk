const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require('../config');

const customTransform = {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) =>  {
        delete ret._id
    }
}

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('toJSON', customTransform);
mongoose.set('toObject', customTransform);
mongoose.set('debug', false);
mongoose.plugin(beautifyUnique);
module.exports = mongoose.createConnection(config.mongodb.uri);
