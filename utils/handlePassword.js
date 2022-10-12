const bcryptjs = require("bcryptjs")

const encrypt = async (passwordPlain)=>{
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash 
}

const compare = async (hashPassword, passwordPlain) => {
    return await bcryptjs.compare(passwordPlain,hashPassword)
}

module.exports = {encrypt, compare}