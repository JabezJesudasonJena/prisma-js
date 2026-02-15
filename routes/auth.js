const express = require("express");
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")

const authrouter = express.Router();
const prisma = new PrismaClient();

authrouter.post("/signup", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassowrd = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : hashedPassowrd
            }
        })
        res.json(user)
    } catch (err) {
        return res.status(500).json({message : err.message})
    }
})

authrouter.post("/chat", async (req, res) => {
    try {
        const {user1Id, user2Id} = req.body;
        const chat = await prisma.chat.create({
            data : {
                user1Id,
                user2Id
            }
        })
        res.json(chat);
    } catch (err) { 
        console.log(err.message)
    }
})

module.exports = authrouter;