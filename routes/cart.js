const router = require('express').Router()
const Cart = require('../models/Cart')

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')

// create
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart)
    }catch(err){
        return res.status(500).json(err);
    }
})

// update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedCart)
    }catch(err){
        return res.status(500).json(err)
    }
})

// delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("Cart has been deleted...")
    }catch(err){
        return res.status(500).json(err)
    }
})

// get user cart
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.userId})

        return res.status(200).json(cart)
    }catch(err){
        return res.status(500).json(err)
    }
})

// get all cart 
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find()
        
        return res.status(200).json(cart)
    }catch(err){
        return res.status(500).json(err)
    }
})

module.exports = router