const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('',customerController.initializeUi);
router.post('',customerController.findCustomers);
router.get('/new-customer-form',customerController.newCustomerForm);
router.post('/create-customer',customerController.createCustomer);
router.get('/update-customer-form/:nic',customerController.updateCustomerForm);
router.post('/modify-customer',customerController.modifyCustomer);
router.get('/delete-customer/:nic',customerController.deleteCustomer);
router.get('/show-customer/:nic',customerController.showCustomer);

module.exports=router;