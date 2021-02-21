let express = require('express');
let router = express.Router();

//  REQUIRED CONTROLLER MODULES
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');
//EXPENSES ROUTES
//POST expense 
router.post('/add-expense', expenseController.add_expense)
//GET
router.get('/get-expenses', expenseController.listExpenses)
//POST reminder schedule
router.post('/add-expense/send-reminder', expenseController.send_reminder)
//POST reminder cancel
router.get('/add-expense/cancel-reminder/:serviceID', expenseController.cancel_reminder)

//USER ROUTES
//POST Create new user
router.post('/create-user', userController.add_user);

//POST user login
router.post('/login', userController.login)

module.exports = router