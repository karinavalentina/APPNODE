const mongoose = require ("mongoose")

const dbconect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(
        DB_URI, 
        {
        useNewUrlParser : true,
        useUnifiedTopology : true
    },
    (err, res) => {
        if (!err) {
            console.log("CONEXION NOSQL CORRECTA")
            }
            else {
                console.log(err)
            }
        }
    );
}



module.exports = dbconect

