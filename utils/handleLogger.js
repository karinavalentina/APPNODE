const MorganBody = require ("morgan-body")
const {IncomingWebhook} = require("@slack/webhook")


const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStram = {
    write : message => {
        webHook.send({text:message})
        console.log("capturando el LOG", message)
    }
} 

module.exports = loggerStram