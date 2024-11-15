const express = require("express");
const {
  editTransaction,
  addTransaction,
  getAllTransaction,
  delete_transaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/add", addTransaction);

router.put("/edit", editTransaction);

router.post("/get", getAllTransaction);

router.delete("/delete", delete_transaction)

module.exports = router;
