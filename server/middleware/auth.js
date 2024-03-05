// Checking auth token 
import jwt from 'jsonwebtoken';
import config from 'config';

function auth(req, res, next) {
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send("Invalid token");
    }
}

export default auth;

// Log Out: res.clearCookie;