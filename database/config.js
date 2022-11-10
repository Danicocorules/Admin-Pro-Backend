// config mongoose
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB on lineEE');

    } catch(error) {
        console.log(error);
        throw new Error('Error al init');
    }

}

module.exports = {
    dbConnection
}