import jwt from "jsonwebtoken";
import "dotenv/config";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    let token = null;

    if (authHeader && authHeader.toLowerCase().startsWith('bearer')) {
        token = authHeader.substring(7); //Getting token hash -> 'Bearer hdfbdhfbhdbfhd'
    }

    //Check if the token is specified in the authorization header.
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded_token = jwt.verify(token, process.env.TOKEN_SECRET);
        //console.log(decoded_token);

        //Getting the user information to use it in the following controller method.
        req.user_id = decoded_token.user_id;
        req.user_email = decoded_token.user_email;
        req.user_role = decoded_token.user_role;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid token' });
    }
}