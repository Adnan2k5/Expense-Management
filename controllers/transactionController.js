const moment = require("moment");
const TransactionModel = require("../models/TransactionModel");
const getAllTransaction = async (req, res) => {
  try {
    const freq = req.body.freq;
    const CustomDate = req.body.CustomDate;
    const type = req.body.type;
    console.log(type);
    console.log(freq);
    console.log(CustomDate);
    const userid = req.body.user._id;
    const transactions = await TransactionModel.find({
      ...(freq !== "custom"
        ? {
            date: { $gt: moment().subtract(Number(freq), "d").toDate() },
            
          }
        : {
            date: {
              $gte: CustomDate[0],
              $lte: CustomDate[1],
            },
          }),
      userid: userid,
      ...(type !=='all' && {type}),
    });
    console.log(transactions);
    res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const userid = req.body.user;
    let id = userid._id;
    let { amount, type, category, description, date, reference } = req.body;
    const transaction = new TransactionModel({
      userid: id,
      amount,
      type,
      category,
      description,
      reference,
      date,
    });
    await transaction.save();
    res.status(200).json("Transaction saved");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = (req,res) =>{
    try{
        
        
    }
    catch(error){

    }

}

module.exports = { getAllTransaction, addTransaction , editTransaction };
