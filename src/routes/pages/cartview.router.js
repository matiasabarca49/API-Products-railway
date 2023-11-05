const express = require('express')
const { Router } = express
const router = new Router()

const ath = (req, res ,next) =>{
    if(req.session.rol === "Admin"){
        next()
    }
    else{
        res.status(401).send({status: "Error", reason: "no autorizado"})
    }
}

router.get("/:cid", ath,(req,res)=>{
    res.render("cartview")
})


module.exports = router
