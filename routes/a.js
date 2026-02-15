const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client")
const jwt = require("jsonwebtoken")
const middleware = require("../controllers/auth")

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res ) => {
    const {name, email, password} = req.body;
    const user = await prisma.user.create({
        data : {
            name : name,
            email : email,
            password : await bcrypt.hash(password, 10)
        },
    })
    res.json({user : user});
})

router.get("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where : { email }
        })

        if (!user) {
            return res.status(400).json({message : "User not found"})
        }
        else { 
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch ) {
                const token = jwt.sign(user, process.env.JWT_SECRET);
                res.status(200).json({user : user, token : token});
            }
            else return res.status(400).json({message : "Wrong credentials "})
        }
        
    } catch ( err) {
        res.status(400).json({mesaage : err.mesaage})
    }
})

router.get('/notes', middleware, (req, res) => {
    res.status(200).json({message : "Success"})
})


module.exports = router