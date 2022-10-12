/*const customHeader = (req, res, next) => {
    try {
    const api_key = req.headers.api_key 
    if (api_key === "karina1234"){
        
        next();
    }
    else{     
            res.status(403)
            res.send({error : "LA API KEY ES INCORRECTA"})
        }
 } 
 catch(e){
    res.status(403)
    res.send({error : "ALGO SALIO MAL"})
 }
}


module.exports = customHeader*/