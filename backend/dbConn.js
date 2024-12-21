const mongoose = require('mongoose')

const mongoDBConnection = async (uri) => {
    try{
        await mongoose.connect(uri)
        console.log(`MongoDB connected`)
    }
    catch(err) {
        console.log(err)
    }
}


module.exports = mongoDBConnection