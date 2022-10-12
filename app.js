require("dotenv").config()
const express = require("express")
const cors = require("cors")
const MorganBody = require ("morgan-body")
const dbconectNOSQL = require ("./config/mongo")
const app = express()
const loggerStram = require ("./utils/handleLogger")
const { dbConnectMySql } = require("./config/mysql")
const ENGINE_DB = process.env.ENGINE_DB


app.use(cors())
app.use(express.json())
app.use(express.static("storage"))


MorganBody(app,
    {
        noColors: true,
        stream: loggerStram,
        skip : function(req, res){
            return res.statusCode < 400
        }    })


const port = process.env.PORT  || 3000

app.use("/api",require("./routes"))

app.listen(port, () => {
    console.log(`App lista en el puerto ${port}`)
});

(ENGINE_DB === "nosql") ? dbconectNOSQL() : dbConnectMySql();