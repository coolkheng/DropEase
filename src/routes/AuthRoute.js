const { Signup, Login } = require('../Controllers/AuthController');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.put('/updateprofile', UpdateProfile); 

module.exports = router;