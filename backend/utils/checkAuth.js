/* eslint-disable no-undef */
import createError from './createError.js'
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        // send it to next middlewre 
        return next( createError({ status: 401, message: 'Unauthorized'}));
    }
     return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return next( createError({ status: 401, message: 'Invalid Token' }))
        }
        // adding our user in this request 
        // ( these values came from payload in auth controller)
        req.user = decoded;
        return next();
    });
}; 