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

authrouter.post("/chat/create", async (req, res) => {
    try {
        const {user1Id, user2Id} = req.body;
        const chat = await prisma.chat.findMany({
            where : {
                user1Id : user1Id,
                user2Id : user2Id
            }
        })

        if (chat.length > 0) return res.status(200).json(chat, {message : "Chat already exist"});
        
        const createChat = await prisma.chat.create({
            data : {
                user1Id : user1Id,
                user2Id : user2Id
            }
        });
        //console.log(createChat);
        return res.json(createChat);
    } catch (err) { 
        console.log(err.message)
    }
})

authrouter.get("/chat/:id", async (req, res) => {
    try { 
        const id = Number(req.params.id);

        const chat = await prisma.chat.findFirst({
            where : {
                id : id
            }
        });
        if (chat) return res.status(200).json(chat);
        return res.status(200).json({message : "User not found"});
    } catch (err) {
        return res.status(400).json({message : err.message})
    }
})

authrouter.post("/message/send", async(req, res) => {
    try {
        const {chatId, senderId, content} = req.body;
        const con = await prisma.message.create({
            data : {
                chatId : chatId,
                senderId : senderId,
                content : content
            }
        });
        res.status(200).json(con);
    } catch (err) {
        return res.status(400).json({message : err.message})
    }
})

module.exports = authrouter;