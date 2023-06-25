// Format of token
    // Authorization: Bearer <access_token>
    // Verify Token
    const tokenVerifier = function(req, res, next) {
        //Get auth header value
        const bearerHeader = req.headers['authorization'];
        //Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined'){
            //split at the space
            const bearer = bearerHeader.split(' ');
            //get token from array bearer
            const bearerToken = bearer[1];
            //set the token
            req.token = bearerToken;
            // call next middleware
            next();
        } else {
            res.json({
                success: false,
                msg: 'Invalid username, please try again'
            })
            return;
        }
    }
    exports.tokenVerifier = tokenVerifier;