const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from request header
    const token = req.header('Authorization');

    // Check if token is missing
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Move to the next middleware
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};