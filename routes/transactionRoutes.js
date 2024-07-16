const express = require('express');
const { editTransaction, addTransaction, getAllTransaction } = require('../controllers/transactionController');
const router = express.Router();


//routes
//Adding transaction 

router.post('/add', addTransaction);

//Edit
router.post('/edit', editTransaction);


//Get all transaction

router.post('/get', getAllTransaction);


module.exports = router;



