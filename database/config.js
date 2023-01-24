const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const dbConection = async() => {

    try {
        await mongoose.connect('mongodb+srv://mean_user:hRWnWMCtkFSox5CB@cluster0.klhvsk0.mongodb.net/hospitaldb'), {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            autoIndex: true
        };

        console.log('DB Online');

    } catch(error) {
        console.log(error);
        throw new Error('error al iniciar la bd')
    }
}

module.exports = {
    dbConection
}