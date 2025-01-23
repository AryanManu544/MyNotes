const express = require("express")
const router = express.Router()
const User = require("../models/User")
const user = User

router.get('/',(req,res) => {
    
    res.json([])
})
module.exports = router