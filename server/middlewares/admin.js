const jwt = require('jsonwebtoken');
const User = require('../models/user');

const admin = (req, res, next) => {
    try {

        const token = req.header('x-auth-token');
        if(!token) return res.status(401).json({msg: 'No AUTH token! Access denied'});
        const verified = jwt.verify(token, 'passwordKey');
        if(!verified) return res.status(401).json({msg: 'Token Verification failed! Authorization failed'});
        const user = User.findById(verified.id);
        if(user.type == 'user' || user.type == 'seller'){
            res.status(401).json({msg: 'You are not an Admin'})
        }
        req.user = verified.id;
        req.token = token;
        next();
    } catch (er) {
        res.status(500).json({error: er.message})
    }
};

module.exports = admin;