const express = require("express");
const router = express.Router();
const Transactions = require("../models/Transaction");
const moment = require("moment");
// Adding Transaction's

router.post("/add-transaction", async (req, res) => {
  try {
    const newTransaction = new Transactions(req.body);
    await newTransaction.save();
    res.send("Transactions Added  Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/edit-transaction", async (req, res) => {
  try {
    await Transactions.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );

    res.send("Transactions Updated  Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/delete-transaction", async (req, res) => {
  try {
    await Transactions.findOneAndDelete({ _id: req.body.transactionId });

    res.send("Transactions Updated  Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transactions.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gt: selectedRange[0],
              $lt: selectedRange[1],
            },
          }),

      userId: req.body.userId,
      ...(type !== "all" && { type }),
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
