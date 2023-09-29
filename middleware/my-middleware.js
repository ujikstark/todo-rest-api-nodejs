require('dotenv').config();

const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;


// Middleware function for JWT token validation
function authenticateToken(req, res, next) {
    // Get the Authorization header
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ code: 401, message: 'Authorization header missing' });
    }

    // Check if the Authorization header starts with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ code: 401, message: 'Invalid token format. you must use Bearer Authorization' });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.slice(7);

    // Verify the token's validity
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
        // Handle token verification errors with descriptive messages
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ code: 401, message: 'Invalid JWT Token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ code: 401, message: 'JWT Token has expired' });
        } else {
            // Handle other token verification errors
            return res.status(500).json({ code: 500, message: 'Token verification error' });
        }
        }

        // Attach the user information to the request object
        req.user = user;
        next(); // Proceed to the next middleware/route
    });
}
  
module.exports = {authenticateToken}