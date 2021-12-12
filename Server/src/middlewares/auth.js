const jwt = require("jsonwebtoken");
const { user } = require("../../models");

exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({ message: "Access denied!" });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({
            message: "Invalid token"
        });
    }
};

exports.admin = async (req, res, next) => {
    try {
        const { id } = req.user;
        const statusUser = await user.findOne({
            where: {
                id
            },
        });
        if (statusUser.status !== "admin") {
            return res.status(403).send({
                status: "Failed",
                message: "Forbidden Access..",
            });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Error",
            message: "Server Error",
        });
    }
};