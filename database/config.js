const mongoose = require('mongoose');
require('dotenv').config();

const dbConection = async() => {

    try {
        await mongoose.connect('mongodb+srv://mean_user:hRWnWMCtkFSox5CB@cluster0.klhvsk0.mongodb.net/hospitaldb'), {
            useNewUrlParser: true,
            iseUnifiedTopology: true,
            useCreateIndex: true
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