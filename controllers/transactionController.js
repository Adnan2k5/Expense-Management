const moment = require("moment");
const TransactionModel = require("../models/TransactionModel");
const getAllTransaction = async (req, res) => {
  try {
    const freq = req.body.freq;
    const CustomDate = req.body.CustomDate;
    const type = req.body.type;
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
      ...(type !== "all" && { type }),
    });
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

const editTransaction = async (req, res) => {
  try {
    const userid = req.body.user._id; 
    const { amount, type, category, description, date, reference } = req.body;
    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { reference, userid }, 
      {
        $set: {
          amount,
          type,
          category,
          description,
          date,
        },
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction Updated", updatedTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const delete_transaction = async (req,res) =>{
  try{
    const userid = req.body.user._id;
    const {reference} = req.body;
    const dete = await TransactionModel.deleteOne({reference})
    if(!dete){
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({message: "Transaction Updated"})
  }
  catch(err){
    console.log(err);
  }
}

module.exports = { getAllTransaction, addTransaction, editTransaction, delete_transaction };
