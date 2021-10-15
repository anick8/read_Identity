var pgsql = require('../lib/pgsql')
var utils = require('../common/utils')
var readIdentity = require('./readIdentity');
module.exports = (app, console) => {
    

    app.post('/readidentity',async (req, res) => {
         result  = await readIdentity.readIdentity(req);
         utils.handleresult(res,result)
        }
    )
        
    app.post('/readallidentities',async (req, res) => {
        result =await readIdentity.readAllIdentities(req);
        utils.handleresult(res,result)
        }
    )

    console.log("Installing TOKEN Routes")
};
