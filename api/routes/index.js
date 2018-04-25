let express = require('express');
let router = express.Router();
let jwt = require('express-jwt'); //lets you authenticate HTTP requests using JWT tokens in your Node.js applications

let auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

let ctrlProfile  = require('../controllers/profile');
let ctrlAuth = require('../controllers/authentication');

router.get('/profile',auth, ctrlProfile.profileRead); //user
router.get('/hei', function(req, res) {
    res.send("Hello World!");
});

router.post('/register', ctrlAuth.register); //user
router.post('/login', ctrlAuth.login);
module.exports = router;