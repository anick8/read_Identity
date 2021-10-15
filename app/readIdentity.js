var pgsql = require('../lib/pgsql')

exports.readIdentity = async (req) => { 

        var email = req.body.Username;
        console.log("Started!!! Email - " + email)
        let result
        qname='select "IdentityUUID","Username" from "Identity" where "Username" = $1' 
        qarg=email
        try{
            result =await pgsql.conquery(qname,[qarg])
            console.log(result.rows)
            data = result.rows
            return [null,data,"Successfully fetched data"]
        }
        catch(err)
        {
            return [err,null,"Error Fetching from data base"]
        }

};

exports.readAllIdentities = async (req) => {

    var identityuuid = req.body.identityuuid || "0";
    var created = req.body.createdat || "0";
    var modified = req.body.modifiedat || "0";
    var limit = req.body.limit || "10";
    var offset = req.body.offset || "0";
    var orderby = req.body.orderby || "CreatedAt";
    var orderdir = req.body.orderdir || "DESC";
    var username = req.body.Username|| '';

	
    const readusersquery = {
        //name: 'fetch-users',
        text: 'SELECT * FROM "Identity" WHERE "CreatedAt" > $1 AND "ModifiedAt" > $2 AND "Username" like $3 ORDER BY $4 '+orderdir+' LIMIT $5 OFFSET $6 ',
        values: [created,modified,`${username}%`,orderby,limit,offset]
    }
	try{
            result =await pgsql.namedquery(readusersquery)
            console.log(result.rows)
            data = result.rows
            return [null,data,"Successfully fetched data"]
        }
        catch(err)
        {
            return [err,null,"Error Fetching from data base"]
        }


};
