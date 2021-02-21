const expenses = require('../models/expensesModel');
const nodemailer = require('nodemailer')
const schedule = require('node-schedule');
//POST new expense
exports.add_expense = function(req, res, next) {
  let expense = new expenses(
    {
      itemName: req.body.itemName,
      expense: req.body.expense,
      tip: req.body.tipPercentage,
      shareOfExpense: req.body.splitBy,
      payMe: req.body.payMe,
      email: req.body.email,
    }
  );
  for (const property in expense) {
    property.trim()
  }
  expense
  .save(function(err) {
    if(err) {return next(err)}
  }) 
  res.status(250)
}
exports.listExpenses = function(req, res, next) {
  expenses.find({})
  .then(expenseList => res.json(expenseList))
  .catch(err => res.status(400).json('error' + err))
}
exports.send_reminder = function(req, res, next) {
  let serviceID = Math.floor(Math.random() * 100).toString()
  let transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'mannyg1218@yahoo.com',
      pass: process.env.EMAIL_TEMP_PW
    }
  });
    schedule.scheduleJob(serviceID, '* * * * *', () => {
    transporter.sendMail({
      from: 'mannyg1218@yahoo.com',
      to: `${req.body.email}`,
      subject: 'pay.me reminder',
      html: `<p> Remember that you are owed ${req.body.payMe} for ${req.body.itemName}. If you have already been paid click <a href='http://localhost:8000/api/add-expense/cancel-reminder/${serviceID}'>here</a> </p>`
    }, console.log('email sent'))
    
    console.log(schedule.scheduledJobs)
    console.log(serviceID)
  })
  
}

exports.cancel_reminder = function(req, res, next) {
  const serviceID = req.params.serviceID
  console.log(req.params)
  let current_job = schedule.scheduledJobs[serviceID]
  current_job.cancel()
  res.send('You will now stop receiving email notifications for this expense')
  console.log('request cancelled')
}