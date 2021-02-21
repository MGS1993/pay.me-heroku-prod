const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema (
  {
    itemName: {type: String, required: true},
    expense: {type: Number, required: true},
    tip: {type: Number, required: false},
    shareOfExpense: {type: Number, required: false},
    payMe: {type: Number, required: true},
    email: {type:String, required: true},

  }
)

module.exports = mongoose.model('Expenses', ExpensesSchema);