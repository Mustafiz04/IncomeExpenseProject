const Transaction = require("./../model/transaction");
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allTransaction = await Transaction.find();

        return res.status(200).json({
            success : true,
            length : allTransaction.length,
            transaction : allTransaction
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : 'Server Error'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        
        await newTransaction.save();

        return res.status(201).json({
            transaction : newTransaction
        })
    } catch (error) {
        try {
            if( error.name === 'ValidationError' ){
                const msgs = Object.values(error.errors).map(val => val.message);

                return res.status(400).json({
                    success : false,
                    error : msgs
                })
            }
        } catch (error) {
            return res.status(500).json({
                success : false,
                error : 'Server Error'
            })
        }
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if( !transaction ){
            return res.status(404).json({
                status : false,
                error : "No transaction found"
            })
        }

        await transaction.remove();

        return res.status(200).json({
            status : true,
            message : "Transaction deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : 'Server Error'
        })
    }
})


module.exports = router;
