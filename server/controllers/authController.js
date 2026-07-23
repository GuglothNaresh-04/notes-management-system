const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const validator = require("validator");
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.createUser(name, email, hashedPassword);

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};