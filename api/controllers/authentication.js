let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('User');



module.exports.register = function (req, res) {
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        let token = user.generateJwt();
        res.status(200);
        res.json({
            'token': token
        });
    });
};

module.exports.login = function () {
    passport.authenticate('local', function (error, user, info) {

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            let token = user.generateJwt();
            res.status(200);
            res.json({
                'token' : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};