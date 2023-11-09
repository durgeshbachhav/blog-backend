const router = require('express').Router();
const { login , register, logout } = require('../controllers/authController')


router.get('/',(req,res)=>{
     res.send('getting user')
})
router.post('/signup',register)
router.post('/login',login)
router.post('/logout',logout)

module.exports = router;