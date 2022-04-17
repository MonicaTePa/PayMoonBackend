const express= require('express');
const router = express.Router();
const users_controller=require('../controllers/users_controller.js');

 


router.get('/', users_controller.getusers);
router.get('/:id',users_controller.getuserbyid);
router.get('/phone/:pn', users_controller.getUserByPhone);
router.post('/', users_controller.postusers);
router.put('/:id', users_controller.putusers);
router.delete('/:id', users_controller.deleteusers);
 

 
module.exports = router;




