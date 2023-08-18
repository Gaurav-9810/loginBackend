const express =require('express')
const {Register, login }=require('../controller/Login');
const {getAllStudent, getOneStudent, getByEmail, isAdmin} =require('../controller/StudentController');

// import Register from '../controller/Login';
const router = express.Router();
 
router.post('/register',Register);
router.post('/login', login);
router.get('/showAll',isAdmin,getAllStudent)
router.get('/show/:id',getOneStudent)
router.get('/:email',getByEmail);



module.exports = router;


