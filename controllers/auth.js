const jwt = require('jsonwebtoken');

const middleware = async (req, res , next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({message : "There is no authHeader"});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(500).json({message : err.message});
    }
}



module.exports = middleware
