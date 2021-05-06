const mongoose = require('mongoose');

const mongoConnection = () =>  {
    mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_SCHEMA}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, 
    (err) => {
        if(err) {
            console.log(err);
        }
        console.log(`Connected on MongoDB: ${process.env.MONGO_HOST}/${process.env.MONGO_SCHEMA}`);
    })
}

module.exports = mongoConnection;